"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "./card";
import Image from "next/image";

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

type Inventory = {
  productId: string;
  datetime: string;
  docId: string;
  currentAmount: number;
  history: [{ addedAmount: number; datetime: string }];
};

type Props = {
  product: Product;
  inventoryId: string;
  inventory?: Inventory;
};

const FormSchema = z.object({
  addedAmount: z.string(),
});

export default function AddInventoryForm({
  product,
  inventoryId,
  inventory,
}: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const postdata = {
      ...data,
      inventoryId: inventoryId,
    };
    console.log(postdata);
    const res = await fetch("/api/addInventory", {
      method: "POST",
      body: JSON.stringify(postdata),
    });

    if (res.ok) {
      const response = await res.json();
      console.log(response.result);
      router.push(`/inventory/`);
    }
  }

  return (
    <div className="w-full max-w-2xl p-8 border rounded-md m-4">
      <div className="text-xl mb-8">Add To Inventory</div>

      <Card className="mb-4">
        <CardContent className="flex p-4 gap-4">
          <div className="w-44">
            <Image
              src={product.image}
              alt={product.product_name}
              width={250}
              height={300}
              className="h-full w-full bg-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">{product.product_name}</h1>
            <div className="text-gray-400 text-sm">{product.details}</div>
            <div className="flex gap-2">
              <span className="bg-gray-400 rounded px-1">ProductId : </span>
              <div className="">{product.id}</div>
            </div>
            <div className="flex gap-2">
              <span className="bg-gray-400 rounded px-1">Catagory :</span>{" "}
              <div className="">{product.catagory}</div>
            </div>
            <div className="flex gap-2">
              <span className="bg-gray-400 rounded px-1">price : </span>
              <div className="">{product.unit_price}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {inventory && (
        <div className="mb-4">
          <div className="mb-2">Inventory History:</div>
          <div className="flex flex-col gap-2">
            {inventory?.history.map((h) => {
              return (
                <Card className="mb-4">
                  <CardContent className="flex p-4 gap-4">
                    <div className="flex flex-wrap w-full items-center justify-between">
                      <div className="flex gap-2">
                        <span className="bg-gray-400 p-1 rounded">
                          Amount Added:
                        </span>
                        <div className="text-xl"> {` ${h.addedAmount}`}</div>
                      </div>
                      <div className="flex gap-2">
                        <span className="bg-gray-400 p-1 rounded">Date:</span>
                        <div className="">
                          {` ${new Date(h.datetime).toUTCString()}`}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="addedAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Amount of product to be Added to The Inventory
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="50" {...field} />
                </FormControl>
                {/* <FormDescription>Input your user name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
