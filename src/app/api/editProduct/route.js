import services from "@/services/connect";

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
  const docId = data.get("docId");
  const newProduct = {
    id: data.get("id"),
    image: data.get("image"),
    details: data.get("details"),
    catagory: data.get("catagory"),
    unit_price: `$${data.get("unit_price")}`,
    product_name: data.get("product_name"),
    datetime: new Date().toISOString(),
  };

  console.log(newProduct);

  try {
    const Allproducts = await services.GetAllProducts();

    const alreadyExist = Allproducts.filter((p) => {
      if (p.id === newProduct.id && p.docId !== docId) return true;
      return false;
    })[0];
    console.log(alreadyExist);

    let productDocId;
    if (!alreadyExist) {
      productDocId = await services.EditProduct(newProduct, docId);
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
