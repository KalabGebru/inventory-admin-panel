"use client";

import ApiCall from "@/components/ui/ApiCall";
import RenderLineChart from "@/components/ui/lineChart";
import BarChartData from "@/components/ui/barChart";
import PieChartData from "@/components/ui/pieChart";
import { useTodo } from "@/hooks/useContextData";
import { Button } from "@/components/ui/button";

export default function Home() {
  // const { products } = useTodo();
  // const session = await getServerSession(options);
  // const user = await services.EditAllInventory();

  return (
    <main className="flex flex-col h-full w-full justify-between p-12 gap-8">
      <div className="flex flex-col w-full h-full justify-center gap-8">
        {/* <div className=" text-white text-3xl">{session?.user.role}</div> */}
        {/* <ApiCall /> */}
        {/* <RenderLineChart /> */}
        <div className="flex flex-wrap gap-4 box-border">
          <div className="w-1/2 box-border">
            <BarChartData Labal="Top Product" />
          </div>
          <div className="w-1/2 box-border">
            <BarChartData Labal="Top Customer" />
          </div>
          <div className="w-1/2 box-border">
            <BarChartData Labal="Top Catagory" />
          </div>
          <div className="w-1/2 box-border">
            <PieChartData />
          </div>
        </div>
      </div>
    </main>
  );
}
