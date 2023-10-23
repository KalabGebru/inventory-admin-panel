"use client";

import services from "@/services/connect";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import ApiCall from "@/components/ui/ApiCall";
import RenderLineChart from "@/components/ui/lineChart";
import BarChartData from "@/components/ui/barChart";
import PieChartData from "@/components/ui/pieChart";

export default async function Home() {
  // const session = await getServerSession(options);
  // const user = await services.EditAllInventory();
  // console.log(session?.user);

  return (
    <main className="flex flex-col h-full w-full justify-between p-12 gap-8">
      <div className="flex flex-col w-full h-full justify-center gap-8">
        {/* <div className=" text-white text-3xl">{session?.user.role}</div> */}
        {/* <ApiCall /> */}
        {/* <RenderLineChart /> */}
        <div className="flex flex-wrap gap-4">
          <div className="w-[600px]">
            <BarChartData Labal="Top Product" />
          </div>
          {/* <div className="w-[600px]">
            <BarChartData Labal="Top Customer" />
          </div>
          <div className="w-[600px]">
            <BarChartData Labal="Top Catagory" />
          </div> */}
          <div className="w-[600px]">
            <PieChartData />
          </div>
        </div>
      </div>
    </main>
  );
}
