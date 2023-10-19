// import { products } from "@/lib/products";
import { columns } from "./columns";
import { ProductDataTable } from "./data-table";
import services from "@/services/connect";
import TotalCard from "@/components/ui/totalCard";

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
  credit: { allowed: boolean; max: number; used: number };
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

  console.log(salesData);

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
        <TotalCard min="2023-10-10" max="2023-10-11" timeLabel="This Week" />
        <TotalCard min="2023-10-10" max="2023-10-14" timeLabel="This Month" />
        <TotalCard min="2023-10-10" max="2023-10-17" timeLabel="This Year" />
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
