"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

type Props = {
  no: string;
  Labal: string;
};
export default function InvCard({ no, Labal }: Props) {
  const [data, setData] = useState();

  const type = Labal == "Product" ? "topByNo" : "topByNoC";
  const typeC = Labal == "Product" ? "topByPrice" : "topByPriceC";

  useEffect(() => {
    const Data = {
      No: no,
    };

    const res = fetch(`/api/topInventory`, {
      method: "POST",
      body: JSON.stringify(Data),
    })
      .then((response) => response.json())
      .then((data: any) => {
        console.log(data);
        setData(data);
      });
  }, []);

  if (!data) return null;

  return (
    <div className="border rounded-md p-6 min-w-[300px]">
      <Tabs defaultValue="byNo" className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="byNo">By No</TabsTrigger>
          <TabsTrigger value="byPrice">By Price</TabsTrigger>
        </TabsList>
        <TabsContent value="byNo">
          <div className="flex flex-col gap-2">
            <div className="">
              <div className="flex justify-between items-center gap-2">
                {Labal == "Product" ? (
                  <h1 className="font-bold text-xl">Top Product</h1>
                ) : (
                  <h1 className="font-bold text-xl">Top Catagory</h1>
                )}
                <span
                  className={`border-2 text-sm rounded-md py-1 px-2 bg-blue-400`}
                >
                  {Labal}
                </span>
              </div>
              <span className="text-xl">
                {data.result[type][0].product_name &&
                  data.result[type][0].product_name}
                {Labal == "Catagory" && data.result[type][0].catagory}
              </span>
            </div>
            <h2 className="text-2xl">
              No of Items : {data.result[type][0].no}
            </h2>
            <div className="">
              <h3 className="flex gap-2">
                <span className="">{data.result[type][0].no}</span>
                <span className="">Items In the Inventory</span>{" "}
              </h3>
              <h3 className="flex gap-2">
                <span className="">In Total </span>
                <span className="">{data.result[type][0].price}</span>
              </h3>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="byPrice">
          <div className="flex flex-col gap-2">
            <div className="">
              <div className="flex justify-between items-center gap-2">
                <h1 className="font-bold text-xl">Top Product</h1>
                <span
                  className={`border-2 text-sm rounded-md py-1 px-2 bg-blue-400`}
                >
                  {Labal}
                </span>
              </div>
              <span className="text-xl">
                {data.result[type][0].product_name &&
                  data.result[type][0].product_name}
                {Labal == "Catagory" && data.result[type][0].catagory}
              </span>
            </div>
            <h2 className="text-2xl">Price : {data.result[typeC][0].price}</h2>
            <div className="">
              <h3 className="flex gap-2">
                <span className="">{data.result[typeC][0].no}</span>
                <span className="">Items In the Inventory</span>{" "}
              </h3>
              <h3 className="flex gap-2">
                <span className="">In Total </span>
                <span className="">{data.result[typeC][0].price}</span>
              </h3>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
