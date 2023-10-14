import CreateInventoryForm from "@/components/ui/createInventoryForm";
import services from "@/services/connect";

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
  const productData = (await services.GetAllProducts()) as Product[];
  return (
    <div className="flex items-center justify-center h-full w-full py-24">
      <div className="w-full max-w-3xl border-2 rounded-lg">
        <CreateInventoryForm product={productData} />
      </div>
    </div>
  );
}
