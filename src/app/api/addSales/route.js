import services from "@/services/connect";
import formidable from "formidable";
import { writeFile } from "fs/promises";
import { join } from "path";
import dynamic from "next/dynamic";

export const config = {
  api: {
    bodyParser: false,
  },
};
export const POST = async (request) => {
  const { paidIn, discounted, customer, totalAmount, items } =
    await request.json();

  console.log(items);

  try {
    const Allinventory = await services.GetAllInventorys();

    items.forEach((item) => {
      const inv = Allinventory.filter((p) => p.productId === item.productId)[0];
      if (inv.currentAmount < item.no) {
        throw new Error();
      }
    });

    let err = [];

    for (let i = 0; i < items.length; i++) {
      console.log(items[i]);
      const inv = Allinventory.filter(
        (p) => p.productId === items[i].productId
      )[0];
      const currentAmount = inv.currentAmount - items[i].no;
      console.log(inv.docId);
      console.log(currentAmount);
      const good = await services.SubInventory(inv.docId, currentAmount);
      if (!good) err.push(items[i].productId);
    }

    const newSales = {
      customer: customer,
      discounted: discounted,
      totalAmount: totalAmount,
      paidIn: paidIn,
      items: items,
      datetime: new Date().toISOString(),
    };

    const created = services.AddSales(newSales);
    const addedToCustomer = services.AddSalesToCustomer(customer, created);

    return new Response(
      JSON.stringify({
        result: {
          faildInv: err.length !== 0 ? false : err,
          created: created ? true : false,
          addedToCustomer: addedToCustomer ? true : false,
        },
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};