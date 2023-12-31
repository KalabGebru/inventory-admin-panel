"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { signIn } from "next-auth/react";
import { BiSolidShow } from "react-icons/Bi";
import { BiSolidHide } from "react-icons/Bi";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(6, {
      message: "password must be at least 6 characters.",
    })
    .max(20),
});

export default function SignInForm() {
  const [hidePassword, setHidePassword] = useState(true);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const username = data.username;
    const password = data.password;
    signIn("credentials", {
      username,
      password,
      callbackUrl,
    });
  }

  return (
    <div className="p-8 border rounded-md">
      <div className="text-xl mb-8">Admin Panal Login Page</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                {/* <FormDescription>Input your user name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className=" relative">
                    <div
                      className="absolute right-2 top-2 p-1 cursor-pointer"
                      onClick={() => setHidePassword((pre) => !pre)}
                    >
                      {hidePassword ? (
                        <BiSolidHide size={20} />
                      ) : (
                        <BiSolidShow size={20} />
                      )}
                    </div>
                    <Input
                      type={hidePassword ? "password" : "text"}
                      placeholder="Password"
                      {...field}
                    />
                  </div>
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
