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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTodo } from "@/hooks/useContextData";
import { toast } from "sonner";

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
  const { users, setUsers, setUsersLoading } = useTodo();
  const [sending, setSending] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const router = useRouter();
  console.log(users);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function fetchUsersdata(id: string, newData: any) {
    // setUsersLoading(true);
    // fetch("/api/getUsers")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setUsers(data.Users);
    //     setUsersLoading(false);
    //   })
    //   .catch((err) => {
    //     setUsersLoading(false);
    //     console.log(err);
    //   });
    const newUsers = [
      ...users,
      {
        docId: id,
        ...newData,
        password: "",
        image: "",
        datetime: new Date().toISOString(),
      },
    ];
    setUsers(newUsers);
  }

  async function AddUser(data: z.infer<typeof FormSchema>) {
    const Userexist = await fetch("/api/userExists", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (Userexist.ok) {
      const response = await Userexist.json();
      console.log(response.exist);
      if (response.exist) {
        throw Error(`Username '${data.username}' already exists`);
      }
    }
    const res = await fetch("/api/registerUser", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const response = await res.json();
      console.log(response.result);
      fetchUsersdata(response.result, data);
      router.push(`/users/`);
      return response.result;
    }
    throw Error("error");
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setSending(true);
    toast.promise(AddUser(data), {
      loading: "sending data ...",
      success: (res) => {
        setSending(false);
        return `User "${data.username}" has been added`;
      },
      error: (err) => {
        setSending(false);
        return err.message;
      },
    });
  }

  return (
    <div className="w-full max-w-xl m-4 flex flex-col gap-4 p-8 border rounded-md">
      <div className="text-xl mb-8">Add Users</div>
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
                      <SelectItem value="sales">Sales</SelectItem>
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
            <Button disabled={sending} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
