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
import { Combobox } from "./Combobox";
import { ComboboxProduct } from "./ComboboxProduct";
import { Card, CardContent } from "./card";
import Image from "next/image";
import { Checkbox } from "./checkbox";

type Sales = {
  customer: string;
  datetime: string;
  docId: string;
  discounted: boolean;
  totalAmount: number;
  paidIn: string;
  items: Items[];
};

type Customer = {
  docId: string;
  first_name: string;
  last_name: string;
  credit: { amount: number; used: number };
  email: string;
  gender: string;
  phone_number: string;
  discount: number;
  history: string[];
};

type Product = {
  image: string;
  id: string;
  invId: string;
  datetime: string;
  catagory: string;
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
  customers: Customer[];
  product: Product[];
  inventory: Inventory[];
};

type Items = {
  productId: string;
  product: Product;
  no: number;
};

const FormSchema = z.object({
  paidIn: z.string(),
  discounted: z.boolean().default(false),
});

export default function AddSalesForm({ customers, product, inventory }: Props) {
  const [customer, setCustomer] = useState<Customer>();
  const [items, setItems] = useState<Items[]>([]);

  const router = useRouter();
  let Total: number = 0;
  items.forEach(
    (item) =>
      (Total =
        Total +
        Math.floor(
          Number(item.product.unit_price.replace(/[^0-9.-]+/g, "")) * item.no
        ))
  );

  console.log(Total);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    if (!customer) {
      return alert(`you haven't selected customer `);
    }
    if (items.length == 0) {
      return alert(`you haven't selected products`);
    }
    const senddata = {
      customer: customer?.docId,
      items: items.map((item) => {
        return { productId: item.productId, no: item.no };
      }),
      totalAmount: Total,
      ...data,
    };
    console.log(senddata);

    const res = await fetch("/api/addSales", {
      method: "POST",
      body: JSON.stringify(senddata),
    });

    if (res.ok) {
      const response = await res.json();
      console.log(response);
      if (response.created) {
        router.push(`/sales/`);
      }
    }
  }

  function subtruct(id: string) {
    setItems((pre) => {
      return pre.map((item) => {
        if (item.productId == id && item.no > 1) {
          return { ...item, no: item.no - 1 };
        }
        return item;
      });
    });
  }

  function add(id: string) {
    setItems((pre) => {
      return pre.map((item) => {
        if (item.productId == id) {
          return { ...item, no: item.no + 1 };
        }
        return item;
      });
    });
  }
  return (
    <div className="flex flex-col gap-4 p-8 border rounded-md ">
      <div className="text-xl mb-8">Add a Sales</div>
      <div className="">
        <div className="mb-2 underline">Customer:</div>
        <Combobox list={customers} setCustomer={setCustomer} />
      </div>
      <div className="">
        <div className="mb-2 underline">Product:</div>
        <ComboboxProduct list={product} setItems={setItems} />
      </div>

      <div className="mt-8">
        <div className="mb-4 underline"> Selected Customer:</div>
        {customer ? (
          <Card className="w-full max-w-xl">
            <CardContent className="flex flex-col gap-2 p-4">
              <div className="">
                <span className="bg-gray-400 p-1 rounded">FirstName:</span>
                {` ${customer.first_name}`}
              </div>
              <div className="">
                <span className="bg-gray-400 p-1 rounded">LastName:</span>
                {` ${customer.last_name}`}
              </div>
              <div className="">
                <span className="bg-gray-400 p-1 rounded">PhoneNumber:</span>
                {` ${customer.phone_number}`}
              </div>
              <div className="">
                <span className="bg-gray-400 p-1 rounded">Email:</span>
                {` ${customer.email}`}
              </div>
            </CardContent>
          </Card>
        ) : (
          `unregisterd`
        )}
      </div>
      <div className="flex flex-col my-8 gap-4">
        <div className="underline">Added Products:</div>
        {items.length !== 0 ? (
          items.map((item: Items) => {
            return (
              <Card className="w-full max-w-xl">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Image
                      src={item.product.image}
                      alt={item.product.product_name}
                      width={100}
                      height={300}
                    />
                    <div className="flex flex-col gap-2 w-full">
                      <h1>{item.product.product_name}</h1>
                      <div className="line-clamp-1">{item.product.details}</div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div
                            className="flex items-center justify-center border cursor-pointer border-green-300 rounded w-8 h-8"
                            onClick={() => subtruct(item.productId)}
                          >
                            -
                          </div>
                          <span>{item.no}</span>
                          <div
                            className="flex items-center justify-center border cursor-pointer border-green-300 rounded w-8 h-8"
                            onClick={() => add(item.productId)}
                          >
                            +
                          </div>
                        </div>
                        <div className="">{item.product.unit_price}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="flex">No products have been selected</div>
        )}
        {Total != 0 && <div>Total:{Total}</div>}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="discounted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Applay Discount</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paidIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" underline">PaidIn:</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="PaidIn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="credit">Credit</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {/* <FormDescription>Input your user password.</FormDescription> */}
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
