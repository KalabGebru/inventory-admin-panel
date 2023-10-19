import EditSalesForm from "@/components/ui/editSalesForm";
import services from "@/services/connect";

type Sales = {
  customer: string;
  items: Items[];
  totalAmount: number;
  docId: string;
  paidIn: string;
  datetime: string;
  discounted: boolean;
};

type Items = { no: number; productId: string };

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

type Props = {
  params: {
    salesId: string;
  };
};

export default async function page({ params }: Props) {
  const customersData = (await services.GetAllCustomers()) as Customer[];
  const productData = (await services.GetAllProducts()) as Product[];
  const salesData = (await services.GetSalesById(params.salesId)) as Sales;

  console.log(salesData);

  if (!customersData || !productData || !salesData) return null;

  return (
    <div className="flex items-center justify-center h-full w-full py-24">
      <EditSalesForm
        customers={customersData}
        product={productData}
        sales={salesData}
      />
    </div>
  );
}
