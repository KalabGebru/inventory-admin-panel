"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditCat from "./editCat";

type cat = {
  datetime: string;
  catagoryName: string;
  docId: string;
};

type Props = {
  catagory: cat[];
};

export default function EditCatagoryForm({ catagory }: Props) {
  const [catagories, setCatagories] = useState(catagory);
  const router = useRouter();

  // async function onSubmit() {
  //   console.log(history);

  //   const postdata = {
  //   //   history,
  //   //   inventoryId: inventoryId,
  //   // };
  //   console.log(postdata);
  //   const res = await fetch("/api/editInventory", {
  //     method: "POST",
  //     body: JSON.stringify(postdata),
  //   });

  //   if (res.ok) {
  //     const response = await res.json();
  //     console.log(response.result);
  //     router.push(`/inventory/`);
  //   }
  // }

  return (
    <div className="w-full max-w-2xl p-8 border rounded-md m-4">
      <div className="text-xl mb-8">Add To Inventory</div>

      {catagories && (
        <div className="mb-4">
          <div className="mb-2">Catagory List:</div>
          <div className="flex flex-col gap-2">
            {catagories.map((h, i) => {
              return <EditCat cat={h} func={setCatagories} catId={h.docId} />;
            })}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        {/* <Button onClick={onSubmit}>Submit</Button> */}
      </div>
    </div>
  );
}
