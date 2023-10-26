import services from "@/services/connect";
import xlsx, { IJsonSheet } from "json-as-xlsx";

type Items = {
  no: number;
  productId: string;
};

type Sales = {
  customer: string;
  productId: string;
  datetime: string;
  docId: string;
  discounted: string;
  totalAmount: number;
  paidIn: string;
  items: Items[];
};

function date(date: any) {
  return new Date(date).toLocaleDateString();
}
export async function downloadToExcel() {
  const Allsales = (await services.GetAllSeles()) as Sales[];
  if (!Allsales) return null;

  const FormatedSales = Allsales.map((sales) => {
    return {
      ...sales,
      items: "",
    };
  });

  let columns: IJsonSheet[] = [
    {
      sheet: "Sales",
      columns: [
        { label: "Document Id", value: "docId" },
        { label: "Customer Id", value: "customer" },
        { label: "Got Discount", value: "discounted" },
        { label: "Total Price", value: "totalAmount" },
        { label: "Paid In", value: "paidIn" },
        {
          label: "Sold Date",
          value: (row) => date(row.datetime),
        },
      ],
      content: FormatedSales,
    },
  ];
  let settings = {
    fileName: "Sales Data",
  };

  xlsx(columns, settings);
}

function getdata(data: any, d: any) {
  return data?.[d];
}

export async function SalseToExcel(ViewSale: any) {
  let columns: IJsonSheet[] = [
    {
      sheet: "Sales",
      columns: [
        { label: "Document Id", value: "docId" },
        {
          label: "Customer FirstName",
          value: (row) => getdata(row.customerD, "first_name"),
        },
        {
          label: "Customer LastName",
          value: (row) => getdata(row.customerD, "last_name"),
        },
        { label: "Got Discount", value: "discounted" },
        { label: "Total Price", value: "totalAmount" },
        { label: "Paid In", value: "paidIn" },
        {
          label: "Sold Date",
          value: (row) => date(row.datetime),
        },
      ],
      content: ViewSale,
    },
  ];
  let settings = {
    fileName: "Sales View Data",
  };

  xlsx(columns, settings);
}
