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

const FormSchema = z.object({
  first_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "lastname must be at least 2 characters.",
  }),
  gender: z.string(),
  email: z.string().email(),
  phone_number: z
    .string()
    .min(9, {
      message: "Phone number must be at '251' + 9 characters.",
    })
    .max(9, {
      message: "Phone number must be at '251' + 9 characters.",
    }),
  creditAmount: z.string(),
  creditUsed: z.string(),
  discount: z
    .string()
    .min(0, {
      message: "Discount must be at least 0%.",
    })
    .max(20, {
      message: "Discount must be at least 20%.",
    }),
});

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

type Props = {
  defaultValue?: Customer;
  editMode?: boolean;
  docId?: string;
};

export default function AddCustomerForm({
  defaultValue,
  editMode,
  docId,
}: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: defaultValue?.first_name,
      last_name: defaultValue?.last_name,
      gender: defaultValue?.gender,
      email: defaultValue?.email,
      phone_number: defaultValue?.phone_number.toString(),
      creditAmount: defaultValue?.credit.amount.toString(),
      creditUsed: defaultValue?.credit.used.toString(),
      discount: defaultValue?.discount.toString(),
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    let res;
    if (editMode && docId) {
      const newData = {
        ...data,
        docId: docId,
      };
      res = await fetch("/api/editCustomer", {
        method: "POST",
        body: JSON.stringify(newData),
      });
    } else {
      res = await fetch("/api/addCustomer", {
        method: "POST",
        body: JSON.stringify(data),
      });
    }

    if (res.ok) {
      const response = await res.json();
      console.log(response.result);
      router.push(`/customer/`);
    }
  }

  return (
    <div className="p-8 border rounded-md">
      <div className="text-xl mb-8">Add a Customer</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                {/* <FormDescription>Input your user name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                {/* <FormDescription>Input your user password.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                {/* <FormDescription>Input your user password.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Phone Number" {...field} />
                </FormControl>
                {/* <FormDescription>Input your user password.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="creditAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credit Allowed For The Customer</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="5000" {...field} />
                </FormControl>
                {/* <FormDescription>Input your user password.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="creditUsed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credit Used For The Customer</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="5000" {...field} />
                </FormControl>
                {/* <FormDescription>Input your user password.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Discount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="10">10%</SelectItem>
                      <SelectItem value="15">15%</SelectItem>
                      <SelectItem value="20">20%</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {/* <FormDescription>Input your user password.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
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
