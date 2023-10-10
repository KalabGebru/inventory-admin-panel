import AddProductForm from "@/components/ui/addProductForm";

export default function page() {
  return (
    <div className="flex items-center justify-center h-full w-full py-24">
      <div className="w-full max-w-3xl border-2 rounded-lg">
        <AddProductForm />
      </div>
    </div>
  );
}