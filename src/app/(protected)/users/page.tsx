import { Button } from "@/components/ui/button";
import services from "@/services/connect";
import Link from "next/link";
import React from "react";
import UserDataTable from "./data-table";
import { columns } from "./columns";

type User = {
  role: string;
  username: string;
  image: string;
  email: string;
  docId: string;
  datetime: string;
};
export default async function page() {
  const allusersData = await services.GetAllUsers();
  console.log(allusersData);

  if (!allusersData) return null;
  const userdata = allusersData?.map((user) => {
    return {
      role: user.role,
      username: user.username,
      image: user.image,
      email: user.email,
      docId: user.docId,
      datetime: user.datetime,
    };
  });

  return (
    <div className="flex flex-col gap-8 items-center justify-center p-24">
      <div className="w-full">
        <UserDataTable columns={columns} data={userdata ? userdata : []} />
      </div>
    </div>
  );
}
