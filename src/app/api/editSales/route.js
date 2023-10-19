import services from "@/services/connect";

export const config = {
  api: {
    bodyParser: false,
  },
};
export const POST = async (request) => {
  const { paidIn, discounted, customer, totalAmount, items, salesId } =
    await request.json();

  console.log(items, salesId);

  try {
    const Allinventory = await services.GetAllInventorys();
    const oldSales = await services.GetSalesById(salesId);

    console.log(oldSales);

    // undo the sale if the product is not there and do deffeence if it does

    const deletedProduct = oldSales.items
      .filter(
        (sale) =>
          items.filter((item) => sale.productId === item.productId).length == 0
      )
      .map((s) => {
        return { ...s, no: s.no * -1 };
      });

    const addedProduct = items.filter(
      (sale) =>
        oldSales.items.filter((item) => sale.productId === item.productId)
          .length == 0
    );

    const updatedProduct = oldSales.items
      .filter(
        (sale) =>
          items.filter((item) => sale.productId === item.productId).length != 0
      )
      .map((s) => {
        return {
          ...s,
          no: items.find((i) => i.productId == s.productId).no - s.no,
        };
      });

    console.log(addedProduct);
    console.log(deletedProduct);
    console.log(updatedProduct);

    const arr = [].concat(addedProduct, deletedProduct, updatedProduct);
    console.log(arr);

    arr.forEach((item) => {
      const inv = Allinventory.filter((p) => p.productId === item.productId)[0];
      if (inv.currentAmount < item.no) {
        throw new Error();
      }
    });

    let removeFromCustomer;
    let addedToCustomer;

    if (oldSales.customer !== customer) {
      const custmer = await services.GetCustomerById(oldSales.customer);
      console.log(custmer);
      const custmerHistory = custmer.history.filter((h) => h !== salesId);

      console.log(custmerHistory);

      removeFromCustomer = services.EditSalesOfCustomer(
        oldSales.customer,
        custmerHistory
      );
      addedToCustomer = services.AddSalesToCustomer(customer, salesId);
    }

    let err = [];

    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
      const inv = Allinventory.filter(
        (p) => p.productId === arr[i].productId
      )[0];
      const currentAmount = inv.currentAmount - arr[i].no;
      console.log(inv.docId);
      console.log(currentAmount);
      const good = await services.SubInventory(inv.docId, currentAmount);
      if (!good) err.push(arr[i].productId);
    }

    const newSales = {
      customer: customer,
      discounted: discounted,
      totalAmount: totalAmount,
      paidIn: paidIn,
      items: items,
    };

    const edited = services.EditSales(salesId, newSales);

    return new Response(
      JSON.stringify({
        result: {
          faildInv: err.length !== 0 ? false : err,
          edited: edited ? true : false,
          addedToCustomer: addedToCustomer ? true : false,
          removeFromCustomer: removeFromCustomer ? true : false,
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
