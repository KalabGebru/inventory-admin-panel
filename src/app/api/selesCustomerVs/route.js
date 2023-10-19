import services from "@/services/connect";

export const POST = async (request) => {
  const { min, max } = await request.json();

  try {
    console.log(min, max, No);

    const salesData = await services.GetAllSeles();

    console.log(salesData);

    const filteredSales = salesData.filter((sale) => {
      const date = sale.datetime;
      if (min && !max) {
        return Date.parse(date) >= Date.parse(min);
      } else if (!min && max) {
        return Date.parse(date) <= Date.parse(end);
      } else if (min && max) {
        return (
          Date.parse(date) >= Date.parse(min) &&
          Date.parse(date) <= Date.parse(max)
        );
      } else return true;
    });

    console.log(filteredSales);

    // make the sale by unregistered customer customer:"XXX" first

    filteredSales.forEach((sale) => {
      const items = sale.items;
      items.forEach((item) => {
        const no = customersObject[sale.customer]
          ? customersObject[sale.customer].no + item.no
          : item.no;
        customersObject[sale.customer] = {
          customerId: sale.customer,
          no: no,
        };
      });
      customersObject[sale.customer] = {
        ...customersObject[sale.customer],
        price: customersObject[sale.customer].price
          ? customersObject[sale.customer] + sale.totalAmount
          : sale.totalAmount,
      };
    });

    console.log(customersObject);

    const Customer = Object.values(customersObject).map((pro) => {
      return {
        ...pro,
        ...customerName[pro.customerId],
      };
    });

    console.log(Customer);

    const TopByNo = Array.from({ length: No }, () => {
      return { price: 0, no: 0 };
    });
    const TopByPrice = Array.from({ length: No }, () => {
      return { price: 0, no: 0 };
    });

    Customer.forEach((pro) => {
      for (let i = 0; i < TopByNo.length; i++) {
        if (pro.no >= TopByNo[i].no) {
          TopByNo.splice(i, 0, pro);
          TopByNo.pop();
          break;
        }
      }
    });

    Customer.forEach((pro) => {
      for (let i = 0; i < TopByPrice.length; i++) {
        if (pro.price >= TopByPrice[i].price) {
          TopByPrice.splice(i, 0, pro);
          TopByPrice.pop();
          break;
        }
      }
    });

    console.log(TopByNo);
    console.log(TopByPrice);

    return new Response(
      JSON.stringify({
        result: {
          topByNo: TopByNo,
          topByPrice: TopByPrice,
        },
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
