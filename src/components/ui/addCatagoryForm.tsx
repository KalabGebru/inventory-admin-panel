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
import { useTodo } from "@/hooks/useContextData";

type Cat = {
  datetime: string;
  catagoryName: string;
  docId: string;
};

const FormSchema = z.object({
  newCatagory: z.string(),
});

export default function AddCatagoryForm() {
  const { catagory, setCatagory, setCatagoryLoading } = useTodo();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function fetchCatagorydata() {
    setCatagoryLoading(true);
    fetch("/api/getCatagorys")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCatagory(data.result);
        setCatagoryLoading(false);
      })
      .catch((err) => {
        setCatagoryLoading(undefined);
        console.log(err);
      });
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const postdata = {
      catagoryName: data.newCatagory,
    };
    console.log(postdata);
    const res = await fetch("/api/addCatagory", {
      method: "POST",
      body: JSON.stringify(postdata),
    });

    if (res.ok) {
      const response = await res.json();
      console.log(response.result);
      fetchCatagorydata();
      router.push(`/product/`);
    }
  }

  return (
    <div className="w-full max-w-3xl p-8 border rounded-md m-4">
      <div className="text-xl mb-8">Add To Catagorys</div>

      {catagory && (
        <div className="mb-4">
          <div className="mb-2">Catagorys List:</div>
          <div className="flex flex-col gap-2">
            {catagory.map((h: Cat, i: number) => {
              return (
                <Card key={i} className="mb-4">
                  <CardContent className="flex p-4 gap-4">
                    <div className="flex flex-wrap w-full items-center justify-between gap-8">
                      <div className="flex gap-2">
                        <span className="bg-gray-400 p-1 rounded">
                          Catagory Name:
                        </span>
                        <div className="text-xl"> {` ${h.catagoryName}`}</div>
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
            name="newCatagory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Catagory</FormLabel>
                <FormControl>
                  <Input placeholder="New Catagory" {...field} />
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
