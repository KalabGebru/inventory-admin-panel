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

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "./card";
import { useTodo } from "@/hooks/useContextData";
import { useState } from "react";
import { toast } from "sonner";

type Customer = {
  docId: string;
  first_name: string;
  last_name: string;
  credit: { allowed: boolean; max: number; used: number };
  email: string;
  gender: string;
  phone_number: string;
  discount: number;
  history: string[];
};

type Props = {
  customer: Customer;
};

const FormSchema = z.object({
  paidAmount: z.string(),
});
export default function AddCreditForm({ customer }: Props) {
  const { setCustomer, setCustomerLoading } = useTodo();
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function fetchCustomerdata() {
    setCustomerLoading(true);
    fetch("/api/getCustomers")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCustomer(data.Inventory);
        setCustomerLoading(false);
      })
      .catch((err) => {
        setCustomerLoading(undefined);
        console.log(err);
      });
  }

  async function AddCreditToCustomer(data: z.infer<typeof FormSchema>) {
    const postdata = {
      newCredit: {
        allowed: true,
        max: customer.credit.max,
        used: customer.credit.used - Number(data.paidAmount),
      },
      customerId: customer.docId,
    };
    console.log(postdata);
    const res = await fetch("/api/addCredit", {
      method: "POST",
      body: JSON.stringify(postdata),
    });

    if (res.ok) {
      const response = await res.json();
      console.log(response.result);
      fetchCustomerdata();
      router.push(`/customer/`);
      return response.result;
    }
    throw Error("error");
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    setSending(true);
    toast.promise(AddCreditToCustomer(data), {
      loading: "sending data ...",
      success: (res) => {
        setSending(false);
        return `$${data.paidAmount} credit has been added to "${customer.first_name}"`;
      },
      error: (err) => {
        setSending(false);
        return err.message;
      },
    });
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl p-8 border rounded-md m-4 ">
      <div className="text-xl">Add Credit To Custhemer</div>

      <div className="flex flex-col gap-4">
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

            <div className="">
              <span className="bg-gray-400 p-1 rounded">Credit:</span>
              {` ${
                customer.credit.max == 0 ? "No Limit" : customer.credit.max
              }-${customer.credit.used}`}
            </div>
          </CardContent>
        </Card>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="paidAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount of the Customer paid back</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={customer.credit.used.toString()}
                    max={customer.credit.used.toString()}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {`The customer's unpaid credit is ${customer.credit.used}`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
