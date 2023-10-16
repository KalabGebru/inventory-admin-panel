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
import { BiSolidShow } from "react-icons/Bi";
import { BiSolidHide } from "react-icons/Bi";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 6 characters.",
  }),
  email: z.string().email().min(5, {
    message: "email must be at least 5 characters.",
  }),
  role: z.string().min(2, {
    message: "role must be at least 2 characters.",
  }),
});

export function AddUsers() {
  const [hidePassword, setHidePassword] = useState(true);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    try {
      const Userexist = await fetch("/api/userExists", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (Userexist.ok) {
        const response = await Userexist.json();
        console.log(response.exist);
        if (response.exist) {
          alert(`Username '${data.username}' exists`);
          return;
        }
      }
      const res = await fetch("/api/registerUser", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const response = await res.json();
        console.log(response.result);
        router.push(`/users/`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
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
              {/* <FormDescription>
                This is a username that will be used to sign in.
              </FormDescription> */}
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
                <Input placeholder="Email" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is a username that will be used to sign in.
              </FormDescription> */}
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
              {/* <FormDescription>
                This is a password that will be used to sign in.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              {/* <FormDescription>
                This is a will access level of the user.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center w-full mt-2">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
