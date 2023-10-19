import AddCustomerForm from "@/components/ui/addCustomerForm";
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

type Props = {
  params: {
    customerId: string;
  };
};
export default async function page({ params }: Props) {
  console.log(params.customerId);
  const userData = (await services.GetCustomerById(
    params.customerId
  )) as Customer;
  console.log(userData);

  if (!userData) return null;

  return (
    <div className="flex items-center justify-center h-full w-full py-24">
      <AddCustomerForm
        defaultValue={userData}
        editMode={true}
        docId={params.customerId}
      />
    </div>
  );
}