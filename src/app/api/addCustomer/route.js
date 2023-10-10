import services from "@/services/connect";

export const POST = async (request) => {
  const { email, first_name, last_name, gender, phone_number, discount } =
    await request.json();
  const newCustomer = {
    id: 101,
    email,
    first_name,
    last_name,
    gender,
    phone_number,
    discount: Number(discount),
  };

  try {
    const newCustomerId = await services.AddCustomer(newCustomer);

    return new Response(JSON.stringify({ result: newCustomerId }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
