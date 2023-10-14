"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "./card";
import Image from "next/image";
import { useState } from "react";
import EditHistory from "./edithistory";

type Product = {
  image: string;
  id: string;
  invId: string;
  catagory: string;
  datetime: string;
  docId: string;
  details: string;
  unit_price: string;
  product_name: string;
};

type Inventory = {
  productId: string;
  datetime: string;
  docId: string;
  currentAmount: number;
  history: [{ addedAmount: number; datetime: string }];
};

type Props = {
  product: Product;
  inventoryId: string;
  inventory?: Inventory;
};

export default function EditInventoryForm({
  product,
  inventoryId,
  inventory,
}: Props) {
  const [history, setHistory] = useState(inventory?.history);
  const router = useRouter();

  async function onSubmit() {
    console.log(history);

    const postdata = {
      history,
      inventoryId: inventoryId,
    };
    console.log(postdata);
    const res = await fetch("/api/editInventory", {
      method: "POST",
      body: JSON.stringify(postdata),
    });

    if (res.ok) {
      const response = await res.json();
      console.log(response.result);
      router.push(`/inventory/`);
    }
  }

  return (
    <div className="p-8 border rounded-md">
      <div className="text-xl mb-8">Add To Inventory</div>

      <Card className="mb-4">
        <CardContent className="flex p-4 gap-4">
          <div className="w-24">
            <Image
              src={product.image}
              alt={product.product_name}
              width={250}
              height={300}
              className="h-full w-full bg-cover"
            />
          </div>
          <div className="">
            <h1 className="text-2xl">{product.product_name}</h1>
            <div className="text-gray-400 text-sm">{product.details}</div>
            <div className="">
              <span className="bg-gray-400 rounded px-1">ProductId : </span>
              {product.id}
            </div>
            <div className="">
              <span className="bg-gray-400 rounded px-1">Catagory :</span>{" "}
              {product.catagory}
            </div>
            <div className="">
              <span className="bg-gray-400 rounded px-1">price : </span>
              {product.unit_price}
            </div>
          </div>
        </CardContent>
      </Card>
      {history && (
        <div className="mb-4">
          <div className="mb-2">Inventory History:</div>
          <div className="flex flex-col gap-2">
            {history.map((h, i) => {
              return <EditHistory his={h} func={setHistory} index={i} />;
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
