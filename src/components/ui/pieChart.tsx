"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

export default function PieChartData() {
  const [data, setData] = useState();
  const [filterDate, setFilterDate] = useState("thisMonth");

  useEffect(() => {
    const now = new Date().toISOString().slice(0, 10);
    const Data =
      filterDate == "thisWeek"
        ? {
            min: "2023-10-15",
            max: now,
          }
        : filterDate == "thisMonth"
        ? { min: "2023-10-01", max: "2023-10-23" }
        : { min: "2023-01-01", max: now };

    const res = fetch(`/api/selesCustomerVs`, {
      method: "POST",
      body: JSON.stringify(Data),
    })
      .then((response) => response.json())
      .then((data: any) => {
        console.log(data);
        setData(data);
      });
  }, [filterDate]);

  if (!data) return null;

  const dd = data.result.Customer;
  // const ddd = data.result.topByPrice;
  const COLORS = ["#0088FE", "#00C49F"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="border rounded-lg p-4">
      <h1 className={`text-xl rounded-md py-1 px-2 mb-2`}>CustomerVs</h1>
      <Tabs defaultValue="byNo" className="">
        <div className="flex items-center justify-between gap-8 mb-8">
          <Select
            onValueChange={(value) => setFilterDate(value)}
            defaultValue={filterDate}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="thisYear">This year</SelectItem>
            </SelectContent>
          </Select>
          <TabsList className="grid grid-cols-2 w-40">
            <TabsTrigger value="byNo">By No</TabsTrigger>
            <TabsTrigger value="byPrice">By Price</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="byNo">
          <div className="w-full aspect-video">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={730} height={250}>
                <Legend
                  layout="horizontal"
                  verticalAlign="top"
                  align="center"
                />
                <Pie
                  data={dd}
                  dataKey="no"
                  nameKey="customerType"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {dd.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]}></Cell>
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="byPrice">
          <div className="w-full aspect-video">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={730} height={50}>
                <Legend
                  layout="horizontal"
                  verticalAlign="top"
                  align="center"
                />
                <Pie
                  data={dd}
                  dataKey="price"
                  nameKey="customerType"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {dd.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
