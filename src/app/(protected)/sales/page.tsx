import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { products } from "@/lib/products";
import { columns } from "./columns";
import { ProductDataTable } from "./data-table";
import services from "@/services/connect";
import { Button } from "@/components/ui/button";

type Items = {
  no: number;
  productId: string;
};

type Sales = {
  customer: string;
  productId: string;
  datetime: string;
  docId: string;
  discounted: string;
  totalAmount: number;
  paidIn: string;
  items: Items[];
};

type Customer = {
  docId: string;
  first_name: string;
  last_name: string;
  credit: { amount: number; used: number };
  email: string;
  gender: string;
  phone_number: string;
  discount: number;
  history: string[];
};

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
export default async function Home() {
  // products.forEach((C) => {
  //   services.AddProduct(C);
  // });

  // await services.EditAllProducts();

  const productData = (await services.GetAllProducts()) as Product[];
  const customersData = (await services.GetAllCustomers()) as Customer[];
  const salesData = (await services.GetAllSeles()) as Sales[];

  const salesViewData = salesData.map((s) => {
    const productD = productData.filter(
      (p) =>
        p.docId === s.items[0].productId || p.docId === s.items[1].productId
    );
    const customerD = customersData.filter((c) => c.docId === s.customer)[0];

    const detailsP = {
      productsD: productD,
      customerD: customerD,
    };

    return {
      ...s,
      ...detailsP,
    };
  });

  if (!productData) {
    return <div className="">can not get any data found</div>;
  }

  // const cat = ["beer", "wine", "wiski", "tekila", "gine"];

  // cat.forEach((p) => {
  //   services.EditAllInventory(p);
  // });

  return (
    <main className="flex flex-col h-full w-full justify-between p-12 gap-8">
      <div className="flex gap-8">
        <Card className="">
          <CardHeader>
            <CardTitle>Top Product</CardTitle>
            <CardDescription>beer 123</CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="flex gap-2">
              <span className="text-xl font-bold">Bought Item:</span>{" "}
              <span className="text-xl ">40</span>
            </h1>
            <h1 className="flex gap-2">
              <span className="text-xl font-bold">Total Money: </span>
              <span className="text-xl ">6000</span>
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
        <ProductDataTable
          columns={columns}
          data={salesViewData ? salesViewData : []}
          // data={products}
        />
      </div>
    </main>
  );
}
