"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

type Props = {
  min: string;
  max: string;
  timeLabel: string;
};
export default function TotalCard({ min, max, timeLabel }: Props) {
  const [data, setData] = useState();

  useEffect(() => {
    const Data = {
      min: min,
      max: max,
    };

    const res = fetch(`/api/totalSales`, {
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
        <div className="flex items-center justify-between gap-8">
          <span className={`border-2 text-sm rounded-md py-1 px-2 bg-blue-400`}>
            {timeLabel}
          </span>
          <TabsList className="grid grid-cols-2 w-40">
            <TabsTrigger value="byNo">By No</TabsTrigger>
            <TabsTrigger value="byPrice">By Price</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="byNo">
          <div className="flex flex-col gap-2">
            <div className="">
              <div className="flex justify-between items-center gap-2">
                <h1 className="font-bold text-xl">Top Product</h1>
              </div>
              <span className="text-2xl">
                Items: {data.result.sum && data.result.sum}
              </span>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="byPrice">
          <div className="flex flex-col gap-2">
            <div className="">
              <div className="flex justify-between items-center gap-2">
                <h1 className="font-bold text-xl">Top Product</h1>
              </div>
              <span className="text-2xl">
                Price: {data.result.sum && data.result.sum}
              </span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
