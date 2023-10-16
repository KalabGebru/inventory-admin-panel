import services from "@/services/connect";
import formidable from "formidable";
import { writeFile } from "fs/promises";
import { join } from "path";
import dynamic from "next/dynamic";

export const config = {
  api: {
    bodyParser: false,
  },
};
export const POST = async (request) => {
  // const form = formidable();
  const data = await request.formData();
  console.log(data);

  // const file = data.get("file");

  const newProduct = {
    id: data.get("id"),
    image: data.get("image"),
    details: data.get("details"),
    catagory: data.get("catagory"),
    unit_price: `$${data.get("unit_price")}`,
    product_name: data.get("product_name"),
    datetime: new Date().toISOString(),
  };
  // { id, image, details, unit_price, imagefile, product_name }
  console.log(newProduct);

  // const bytes = await file.arrayBuffer();
  // const buffer = Buffer.from(bytes);
  // console.log(buffer);
  try {
    // const path = join("./", "public", file.name);
    // console.log(path);
    // await writeFile(path, buffer);
    // console.log(`open ${path} to see the uploaded file`);

    // const newCustomerId = await services.UploadImage(image);
    const Allproducts = await services.GetAllProducts();

    const alreadyExist = Allproducts.filter((p) => p.id === newProduct.id)[0];
    console.log(alreadyExist);

    let productDocId;
    if (!alreadyExist) {
      productDocId = await services.AddProduct(newProduct);
      console.log(productDocId);
    } else {
      productDocId = alreadyExist.docId;
    }

    return new Response(
      JSON.stringify({
        alreadyExist: alreadyExist ? true : false,
        result: productDocId,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
