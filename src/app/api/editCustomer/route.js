import services from "@/services/connect";

export const POST = async (request) => {
  const {
    email,
    first_name,
    last_name,
    gender,
    phone_number,
    discount,
    creditAmount,
    docId,
    creditUsed,
  } = await request.json();

  try {
    const newCustomer = {
      id: 101,
      credit: {
        amount: Number(creditAmount),
        used: Number(creditUsed),
      },
      email,
      first_name,
      last_name,
      gender,
      phone_number,
      discount: Number(discount),
      history: [],
    };
    console.log(newCustomer);
    const newCustomerId = await services.EditCustomer(newCustomer, docId);

    return new Response(JSON.stringify({ result: newCustomerId }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
