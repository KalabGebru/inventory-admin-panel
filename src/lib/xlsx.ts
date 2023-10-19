import services from "@/services/connect";
import xlsx, { IJsonSheet } from "json-as-xlsx";

// {datetime: '2023-10-13T18:09:46.627Z',
//       paidIn: 'cash',
//       customer: '1SDAMTbgHZia8F6c6IHd',
//       discounted: true,
//       totalAmount: 19458,
//       docId: 'Ex18HjbPXoBTSe83BuUw',
//       items: [
//         { productId: '0oFBCjc6amAFPQk4U7zf', no: 3 },
//         { productId: '0Nn0flH1jjwyilHV2CUQ', no: 4 }
//       ]}

export async function downloadToExcel() {
  const Allsales = await services.GetAllSeles();
  if (!Allsales) return null;

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
          value: (row) => new Date(row.datetime).toLocaleDateString(),
        },
      ],
      content: Allsales,
    },
  ];
  let settings = {
    fileName: "Sales Data",
  };

  xlsx(columns, settings);
}

// {
//     docId: 'Ex18HjbPXoBTSe83BuUw',
//     paidIn: 'cash',
//     items: [
//       { productId: '0oFBCjc6amAFPQk4U7zf', no: 3 },
//       { no: 4, productId: '0Nn0flH1jjwyilHV2CUQ' }
//     ],
//     discounted: true,
//     totalAmount: 19458,
//     customer: '1SDAMTbgHZia8F6c6IHd',
//     datetime: '2023-10-13T18:09:46.627Z',
//     productsD: [
//       {
//         catagory: 'tekila',
//         image: 'http://dummyimage.com/239x100.png/dddddd/000000',
//         unit_price: '$1547.92',
//         product_name: 'Seabream Whole Farmed',
//         datetime: '2022-09-08T12:02:01Z',
//         details:
//           'vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla',
//         docId: '0Nn0flH1jjwyilHV2CUQ',
//         invId: 'ADykZM6xxrOQBOXPnfuH',
//         id: '0906214114'
//       },
//       {
//         details: 'eget eleifend luctus ultricies eu nibh quisque id justo sit',
//         product_name: 'Nantucket Cranberry Juice',
//         docId: '0oFBCjc6amAFPQk4U7zf',
//         image: 'http://dummyimage.com/199x100.png/5fa2dd/ffffff',
//         invId: 'bYZPEentw52gJzTfIBk6',
//         unit_price: '$4422.38',
//         catagory: 'wiski',
//         datetime: '2022-09-10T02:32:50Z',
//         id: '6861953482'
//       }
//     ],
//     customerD: {
//       discount: 19,
//       email: 'kchippindale4@fastcompany.com',
//       first_name: 'Katharine',
//       last_name: 'Chippindale',
//       gender: 'Female',
//       history: [],
//       phone_number: '(123) 2894029',
//       credit: { used: 3000, amount: 5000 },
//       docId: '1SDAMTbgHZia8F6c6IHd'
//     }
//   },
export async function SalseToExcel(ViewSale: any) {
  const Allsales = await services.GetAllSeles();
  if (!Allsales) return null;

  let columns: IJsonSheet[] = [
    {
      sheet: "Sales",
      columns: [
        { label: "Document Id", value: "docId" },
        {
          label: "Customer FirstName",
          value: (row) => row.customerD?.first_name,
        },
        {
          label: "Customer LastName",
          value: (row) => row.customerD?.last_name,
        },
        { label: "Got Discount", value: "discounted" },
        { label: "Total Price", value: "totalAmount" },
        { label: "Paid In", value: "paidIn" },
        {
          label: "Sold Date",
          value: (row) => new Date(row.datetime).toLocaleDateString(),
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
