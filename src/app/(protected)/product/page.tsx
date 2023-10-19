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
import TopCard from "@/components/ui/topCard";

type Product = {
  image: string;
  id: string;
  invId: string;
  catagory: string;
  datetime: string;
  docId: string;
  details: string;
  unit_price: string;
  product_name: string;
};

export default async function Home() {
  // const ed = await services.Ed(Data);

  const catagoryData = await services.GetAllCatagory();
  const productData = (await services.GetAllProducts()) as Product[];

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
        <TopCard
          min="2023-10-10"
          max="2023-10-17"
          no={1}
          path="topProducts"
          timeLabel="This Week"
        />
        <TopCard
          min="2023-10-10"
          max="2023-10-17"
          no={1}
          path="topProducts"
          timeLabel="This Month"
        />
        <TopCard
          min="2023-10-10"
          max="2023-10-17"
          no={1}
          path="topProducts"
          timeLabel="This Year"
        />
      </div>

      <div className="">
        <ProductDataTable
          columns={columns}
          data={productData ? productData : []}
          catagory={catagoryData ? catagoryData : []}
          // data={products}
        />
      </div>
    </main>
  );
}
