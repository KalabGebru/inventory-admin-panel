"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import { ComboboxInventory } from "./ComboboxInventory";
import Image from "next/image";
import Link from "next/link";

type Product = {
  image: string;
  id: string;
  invId: string;
  datetime: string;
  catagory: string;
  docId: string;
  details: string;
  unit_price: string;
  product_name: string;
};

type Props = {
  product: Product[];
};

export default function CreateInventoryForm({ product }: Props) {
  const [items, setItems] = useState<Product>();

  const router = useRouter();

  async function onSubmit(productId: string) {
    console.log();

    const res = await fetch("/api/createInventory", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });

    if (res.ok) {
      const response = await res.json();
      console.log(response);
      if (response.result) {
        router.push(`/inventory/addInventory/${response.result}`);
      }
    }
  }

  return (
    <div className="w-full max-w-3xl p-8 border rounded-md m-4 flex flex-col gap-4">
      <div className="text-xl mb-8">Create Inventory</div>

      <div className="">
        <div className="mb-2 underline">Selected Product</div>
        <ComboboxInventory list={product} setProduct={setItems} />
        <div className="mt-8">
          {items ? (
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 border rounded p-4 w-full mr-4">
                <div className="w-24 rounded border overflow-hidden">
                  <Image
                    src={items.image}
                    alt={items.product_name}
                    width={100}
                    height={200}
                    className="w-full h-full bg-cover"
                  />
                </div>
                <div className="w-full">
                  <div className="line-clamp-1 text-lg font-bold">
                    {items.product_name}
                  </div>
                  <div className="line-clamp-2">{items.details}</div>
                  <div className="">{items.id}</div>
                </div>
              </div>

              {items.invId ? (
                <div className="flex flex-wrap gap-4 items-center justify-between w-full">
                  <div className="text-gray-500">
                    Inventory for this product exists{" "}
                  </div>
                  <div className="flex gap-4">
                    <Button variant="link" asChild>
                      <Link href={`/inventory/addInventory/${items.invId}`}>
                        View & Add Inventory
                      </Link>
                    </Button>
                    <Button variant="link" asChild>
                      <Link href={`/inventory/editInventory/${items.invId}`}>
                        View & Edit Inventory
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-end w-full">
                  <Button onClick={() => onSubmit(items.docId)}>
                    create Inventory
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-400">No product is selected</div>
          )}
        </div>
      </div>
    </div>
  );
}
