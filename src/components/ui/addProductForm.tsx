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
import { useState } from "react";

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
  unit_price: z.string(),
  details: z
    .string()
    .min(10, {
      message: "Details must be at least 10 characters.",
    })
    .max(160, {
      message: "Details must be at max 160 characters.",
    }),
  image: z.string().url(),
});

export default function AddProductForm() {
  const [file, setfile] = useState<File>();
  const router = useRouter();
  const formData = new FormData();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function objectToFormData(obj: object) {
    Object.entries(obj).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    console.log(file);
    objectToFormData(data);
    if (file) {
      formData.append("file", file);
    }

    const res = await fetch("/api/addProduct", {
      method: "POST",
      body: formData,
    });
    console.log(formData);

    if (res.ok) {
      const response = await res.json();
      console.log(response.result);
      router.push(`/product/`);
    }
  }

  return (
    <div className="p-8 border rounded-md">
      <div className="text-xl mb-8">Add a Product</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
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
          <FormField
            control={form.control}
            name="unit_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Price</FormLabel>
                <FormControl>
                  <Input placeholder="Unit Price" {...field} />
                </FormControl>
                {/* <FormDescription>Input your user password.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="Image URL" {...field} />
                </FormControl>
                {/* <FormDescription>Input your user password.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormLabel>Image File</FormLabel>

          <Input
            type="file"
            onChange={(e) => setfile(e.target.files?.[0])}
            required
            placeholder="Image File"
          />

          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
