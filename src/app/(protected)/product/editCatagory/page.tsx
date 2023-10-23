import EditCatagoryForm from "@/components/ui/editCatagoryForm";
import services from "@/services/connect";

type Cat = {
  datetime: string;
  catagoryName: string;
  docId: string;
};

export default async function page() {
  const catagory = (await services.GetAllCatagorys()) as Cat[];

  if (!catagory) return <div className="">no catagories was found</div>;

  return (
    <div className="flex items-center justify-center h-full w-full py-24">
      <EditCatagoryForm catagory={catagory} />
    </div>
  );
}
