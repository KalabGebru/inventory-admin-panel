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
// import { people } from "@/lib/customers";

type Customer = {
  id: number;
  docId: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  phone_number: string;
  discount: number;
};

export default async function Home() {
  // people.forEach((C) => {
  //   services.AddCustomer(C);
  // });

  const custemersData = (await services.GetAllCustomers()) as Customer[];

  if (!custemersData) {
    return <div className="">can not get any data found</div>;
  }

  return (
    <main className="flex flex-col h-full w-full p-12 gap-8">
      <div className="flex gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Buyer</CardTitle>
            <CardDescription>John Doe</CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="flex gap-2">
              <span className="text-xl font-bold">Bought Item:</span>{" "}
              <span className="text-xl ">20</span>
            </h1>
            <h1 className="flex gap-2">
              <span className="text-xl font-bold"> Money Spent: </span>
              <span className="text-xl ">5000</span>
            </h1>
          </CardContent>
          {/* <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter> */}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Buyer</CardTitle>
            <CardDescription>John Doe</CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="flex gap-2">
              <span className="text-xl font-bold">Bought Item:</span>{" "}
              <span className="text-xl ">20</span>
            </h1>
            <h1 className="flex gap-2">
              <span className="text-xl font-bold"> Money Spent: </span>
              <span className="text-xl ">5000</span>
            </h1>
          </CardContent>
          {/* <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter> */}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Buyer</CardTitle>
            <CardDescription>John Doe</CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="flex gap-2">
              <span className="text-xl font-bold">Bought Item:</span>{" "}
              <span className="text-xl ">20</span>
            </h1>
            <h1 className="flex gap-2">
              <span className="text-xl font-bold"> Money Spent: </span>
              <span className="text-xl ">5000</span>
            </h1>
          </CardContent>
          {/* <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter> */}
        </Card>
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
