"use client";
import CreateInventoryForm from "@/components/ui/createInventoryForm";
import { useTodo } from "@/hooks/useContextData";

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
export default async function page() {
  const { products } = useTodo();
  return (
    <div className="flex items-center justify-center h-full w-full py-24">
      <CreateInventoryForm product={products} />
    </div>
  );
}
