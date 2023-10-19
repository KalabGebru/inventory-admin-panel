import AddSalesForm from "@/components/ui/addSalesForm";
import services from "@/services/connect";

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

type Inventory = {
  productId: string;
  datetime: string;
  docId: string;
  currentAmount: number;
  history: [{ addedAmount: number; datetime: string }];
};

export default async function page() {
  const customersData = (await services.GetAllCustomers()) as Customer[];
  const productData = (await services.GetAllProducts()) as Product[];
  const inventoryData = (await services.GetAllInventorys()) as Inventory[];
  return (
    <div className="flex items-center justify-center h-full w-full py-24">
      <AddSalesForm
        customers={customersData}
        product={productData}
        inventory={inventoryData}
      />
    </div>
  );
}
