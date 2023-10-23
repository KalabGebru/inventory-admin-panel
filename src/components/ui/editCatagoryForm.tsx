"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditCat from "./editCat";
import { useTodo } from "@/hooks/useContextData";

type cat = {
  datetime: string;
  catagoryName: string;
  docId: string;
};

type Props = {
  catagory: cat[];
};

export default function EditCatagoryForm({ catagory }: Props) {
  const { setCatagory, setCatagoryLoading } = useTodo();
  const [catagorys, setCatagorys] = useState(catagory);
  console.log(catagorys);
  const router = useRouter();

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

  async function onSubmit() {
    console.log(catagorys);

    const sentdata = {
      catagorys: catagorys,
    };

    const res = await fetch("/api/editCatagory", {
      method: "POST",
      body: JSON.stringify(sentdata),
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
      <div className="text-xl mb-8">Edit Catagorys</div>

      {catagorys && (
        <div className="mb-4">
          <div className="mb-2">Catagory List:</div>
          <div className="flex flex-col gap-2">
            {catagorys.map((h, i) => {
              return (
                <EditCat
                  key={h.docId}
                  cat={h}
                  func={setCatagorys}
                  catId={h.docId}
                />
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  );
}
