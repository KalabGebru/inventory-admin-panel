"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "./textarea";
import { useEffect, useState } from "react";
import UploadImageToStorage from "./UploadImg";
import Image from "next/image";
import { useTodo } from "@/hooks/useContextData";
import { toast } from "sonner";

const FormSchema = z.object({
  id: z.string(),
  product_name: z
    .string()
    .min(2, {
      message: "Product Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Product Name must be at max 30 characters.",
    }),
  catagory: z.string(),
  unit_price: z.string(),
  details: z
    .string()
    .min(10, {
      message: "Details must be at least 10 characters.",
    })
    .max(160, {
      message: "Details must be at max 160 characters.",
    }),
});

type cat = {
  datetime: string;
  catagoryName: string;
  docId: string;
};
type Product = {
  image: string;
  id: string;
  invId: string;
  catagory: string;
  datetime: string;
  docId: string;
  details: string;
  unit_price: string;
  product_name: string;
};

type Props = {
  defaultValue?: Product;
  editMode?: boolean;
  docId?: string;
};

export default function AddProductForm({
  defaultValue,
  editMode,
  docId,
}: Props) {
  // const [file, setfile] = useState<File>();
  const { setProducts, setProductsLoading } = useTodo();
  const [sending, setSending] = useState(false);
  const [catagorys, setCatagorys] = useState([]);
  const [image, setImage] = useState(
    editMode ? { image: defaultValue?.image } : { image: "" }
  );

  function fetchProductdata() {
    setProductsLoading(true);
    fetch("/api/getProducts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.Products);
        setProductsLoading(false);
      })
      .catch((err) => {
        setProductsLoading(undefined);
        console.log(err);
      });
  }

  const router = useRouter();
  const formData = new FormData();

  useEffect(() => {
    const res = fetch("/api/getCatagorys")
      .then((response) => response.json())
      .then((data) => {
        setCatagorys(data.result);
      });
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: defaultValue?.id,
      product_name: defaultValue?.product_name,
      catagory: defaultValue?.catagory,
      unit_price: Number(
        defaultValue?.unit_price.replace(/[^0-9.-]+/g, "")
      ).toString(),
      details: defaultValue?.details,
    },
  });

  function objectToFormData(obj: object) {
    Object.entries(obj).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  async function AddEditProduct(data: z.infer<typeof FormSchema>) {
    objectToFormData(data);
    if (image.image) {
      formData.append("image", image.image);
    }

    let res;
    if (editMode && docId) {
      formData.append("docId", docId);
      res = await fetch("/api/editProduct", {
        method: "POST",
        body: formData,
      });
    } else {
      res = await fetch("/api/addProduct", {
        method: "POST",
        body: formData,
      });
    }

    console.log(formData);

    if (res.ok) {
      const response = await res.json();
      console.log(response.result);
      if (response.alreadyExist) {
        // alert(`a product with ${data.id} already exists`);
        throw Error(`a product with ${data.id} already exists`);
      } else {
        fetchProductdata();
        router.push(`/product/`);
        return response.result;
      }
    }
    throw Error("error");
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    setSending(true);
    toast.promise(AddEditProduct(data), {
      loading: "sending data ...",
      success: (res) => {
        setSending(false);
        return `Product has been ${editMode ? "edited" : "added"}`;
      },
      error: (err) => {
        setSending(false);
        return err.message;
      },
    });
  }

  if (!catagorys) return null;
  return (
    <div className="w-full max-w-5xl p-8 border rounded-md m-4">
      <div className="text-xl mb-8">Add a Product</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-wrap gap-6">
            <div className="w-full xl:w-96">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Product ID" {...field} />
                    </FormControl>
                    {/* <FormDescription>Input your user name.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full xl:w-96">
              <FormField
                control={form.control}
                name="product_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Name" {...field} />
                    </FormControl>
                    {/* <FormDescription>Input your user name.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full xl:w-96">
              <FormField
                control={form.control}
                name="catagory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catagory</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Catagory" />
                        </SelectTrigger>
                        <SelectContent>
                          {catagorys.map((cat: cat) => (
                            <SelectItem value={cat.catagoryName}>
                              {cat.catagoryName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {/* <FormDescription>Input your user password.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full xl:w-96">
              <FormField
                control={form.control}
                name="unit_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Unit Price"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>Input your user password.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full xl:w-[600px]">
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Input Discription of the Product"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>Input your user password.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4 w-full xl:w-[600px] ">
              <FormLabel>Image File</FormLabel>

              <UploadImageToStorage setURL={setImage} path="product/" />

              <div className="w-[200px] h-[200px] border-2 rounded-md">
                {image.image && (
                  <Image
                    src={image.image}
                    alt={image.image}
                    className="bg-cover h-full"
                    width={200}
                    height={200}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button disabled={sending} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
