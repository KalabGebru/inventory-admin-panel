import AddInventoryForm from "@/components/ui/addInventoryForm";
import services from "@/services/connect";

type Inventory = {
  productId: string;
  datetime: string;
  docId: string;
  currentAmount: number;
  history: [{ addedAmount: number; datetime: string }];
};

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
    inventoryId: string;
  };
};
export default async function page({ params }: Props) {
  console.log(params.inventoryId);
  const inventory = (await services.GetInventoryById(
    params.inventoryId
  )) as Inventory;
  if (!inventory) return <div className="">no Inventory by that ID</div>;
  const product = (await services.GetProductById(
    inventory.productId
  )) as Product;
  console.log(product);

  if (!product) return <div className="">no product by that ID</div>;

  return (
    <div className="flex items-center justify-center h-full w-full py-24">
      <AddInventoryForm
        product={product}
        inventoryId={params.inventoryId}
        inventory={inventory}
      />
    </div>
  );
}
