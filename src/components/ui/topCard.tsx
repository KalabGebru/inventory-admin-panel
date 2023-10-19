"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

type Props = {
  min: string;
  max: string;
  no: number;
  path: string;
  timeLabel: string;
};
export default function TopCard({ min, max, no, path, timeLabel }: Props) {
  const [data, setData] = useState();

  useEffect(() => {
    const Data = {
      min: min,
      max: max,
      No: no,
    };

    const res = fetch(`/api/${path}`, {
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
                <h1 className="font-bold text-xl">Top Product</h1>
                <span
                  className={`border-2 text-sm rounded-md py-1 px-2 bg-blue-400`}
                >
                  {timeLabel}
                </span>
              </div>
              <span className="text-xl">
                {data.result.topByNo[0].product_name &&
                  data.result.topByNo[0].product_name}
                {data.result.topByNo[0].first_name &&
                  `${data.result.topByNo[0].first_name} ${data.result.topByNo[0].last_name}`}
              </span>
            </div>
            <h2 className="text-2xl">
              No of Items : {data.result.topByNo[0].no}
            </h2>
            <div className="">
              <h3 className="flex gap-2">
                <span className="">{data.result.topByNo[0].no}</span>
                <span className="">Items Bought this week</span>{" "}
              </h3>
              <h3 className="flex gap-2">
                <span className="">In Total </span>
                <span className="">{data.result.topByNo[0].price}</span>
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
                  {timeLabel}
                </span>
              </div>
              <span className="text-xl">
                {data.result.topByPrice[0].product_name &&
                  data.result.topByPrice[0].product_name}
                {data.result.topByPrice[0].first_name &&
                  `${data.result.topByPrice[0].first_name} ${data.result.topByPrice[0].last_name}`}
              </span>
            </div>
            <h2 className="text-2xl">
              Price : {data.result.topByPrice[0].price}
            </h2>
            <div className="">
              <h3 className="flex gap-2">
                <span className="">{data.result.topByPrice[0].no}</span>
                <span className="">Items Bought this week</span>{" "}
              </h3>
              <h3 className="flex gap-2">
                <span className="">In Total </span>
                <span className="">{data.result.topByPrice[0].price}</span>
              </h3>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
