import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomerDataTable from "./data-table";
import services from "@/services/connect";
import { columns } from "./columns";
import TopCard from "@/components/ui/topCard";
// import { people } from "@/lib/customers";

type Customer = {
  docId: string;
  first_name: string;
  last_name: string;
  credit: { allowed: boolean; max: number; used: number };
  email: string;
  gender: string;
  phone_number: string;
  discount: number;
  history: string[];
};

export default async function Home() {
  // people.forEach((C) => {
  //   services.AddCustomer(C);
  // });

  // await services.EditAllProducts();

  const custemersData = (await services.GetAllCustomers()) as Customer[];

  if (!custemersData) {
    return <div className="">can not get any data found</div>;
  }

  return (
    <main className="flex flex-col h-full w-full p-12 gap-8">
      <div className="flex gap-8">
        <TopCard
          min="2023-10-10"
          max="2023-10-17"
          no={1}
          path="topCustomers"
          timeLabel="This Week"
        />
        <TopCard
          min="2023-10-10"
          max="2023-10-17"
          no={1}
          path="topCustomers"
          timeLabel="This Week"
        />
        <TopCard
          min="2023-10-10"
          max="2023-10-17"
          no={1}
          path="topCustomers"
          timeLabel="This Week"
        />
      </div>
      <div className="">
        <CustomerDataTable
          columns={columns}
          data={custemersData ? custemersData : []}
          // data={people}
        />
      </div>
    </main>
  );
}
