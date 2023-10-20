import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import services from "@/services/connect";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import ApiCall from "@/components/ui/ApiCall";
import RenderLineChart from "@/components/ui/lineChart";
import BarChartData from "@/components/ui/barChart";

export default async function Home() {
  const session = await getServerSession(options);
  // const user = await services.EditAllInventory();
  console.log(session?.user);

  return (
    <main className="flex flex-col h-full w-full justify-between p-12 gap-8">
      <div className="w-full h-full">
        <div className=" text-white text-3xl">{session?.user.role}</div>
        {/* <ApiCall /> */}
        {/* <RenderLineChart /> */}
        {/* <BarChartData /> */}
      </div>
    </main>
  );
}
