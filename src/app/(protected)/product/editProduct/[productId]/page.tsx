import AddProductForm from "@/components/ui/addProductForm";
import services from "@/services/connect";

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

type Props = {
  params: {
    productId: string;
  };
};
export default async function page({ params }: Props) {
  console.log(params.productId);
  const userData = (await services.GetProductById(params.productId)) as Product;
  console.log(userData);

  if (!userData) return null;
  return (
    <div className="flex items-center justify-center h-full w-full py-24">
      <AddProductForm
        editMode={true}
        defaultValue={userData}
        docId={params.productId}
      />
    </div>
  );
}
