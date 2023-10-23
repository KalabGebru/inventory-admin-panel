"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Product } from "@/lib/products";
import { FiMoreVertical } from "react-icons/fi";
import { RiArrowUpDownFill } from "react-icons/Ri";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { string } from "zod";
// import { Product } from "@/lib/products";

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

type Product = {
  image: string;
  id: string;
  invId: string;
  datetime: string;
  catagory: string;
  docId: string;
  details: string;
  unit_price: string;
  product_name: string;
};

type Items = {
  no: number;
  productId: string;
};

type SalesViewData = {
  productsD: Product[];
  customerD: Customer | string;
  customer: string;
  productId: string;
  datetime: string;
  docId: string;
  discounted: string;
  totalAmount: number;
  paidIn: string;
  items: Items[];
};

async function deleteSales(id: string) {
  console.log(id);
  const res = await fetch("/api/deleteSales", {
    method: "POST",
    body: JSON.stringify({ id }),
  });

  if (res.ok) {
    const response = await res.json();
    console.log(response.result);
    window.location.reload();
  }
}

export const columns: ColumnDef<SalesViewData>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Products",
    accessorKey: "productsD",
    cell: ({ row }) => {
      const Allproducts: Product[] = row.getValue("productsD");
      console.log(Allproducts);
      const Allnames = Allproducts.map((g) => g.product_name);

      return <div className="">{Allnames.join(" , ")}</div>;
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
          className="pl-0"
        >
          Customer Name
          <RiArrowUpDownFill size={16} />
        </Button>
      );
    },
    accessorKey: "customerD",
    cell: ({ row }) => {
      const customer: Customer = row.getValue("customerD");
      return (
        <div className="">
          {customer?.first_name ? customer?.first_name : "XXXX"}
        </div>
      );
    },
    filterFn: (row, columnId, filterStatuses) => {
      if (!filterStatuses) return true;
      const customer: Customer = row.getValue(columnId);
      // value => two date input values
      //If one filter defined and date is null filter it
      let allCharactersExist = true;
      const text = customer.first_name ? customer.first_name : customer;
      let name = text.toString().toLowerCase();
      for (let i = 0; i < filterStatuses.length; i++) {
        const caracter = filterStatuses[i].toLowerCase();
        if (!name.includes(caracter)) {
          allCharactersExist = false;
          break;
        } else {
          name = name.replace(caracter, "");
        }
      }
      return allCharactersExist;
    },
  },
  {
    header: "PaidIn",
    accessorKey: "paidIn",
    cell: ({ row }) => {
      const paidIn = row.getValue("paidIn");
      return paidIn == "credit" ? (
        <div className="flex items-center justify-center bg-yellow-400 font-bold rounded rouned text-yellow-900">
          <div className="">Credit</div>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-green-400 font-bold rounded text-green-900">
          <div className="">Cash</div>
        </div>
      );
    },
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses) => {
      if (filterStatuses.length === 0) return true;
      const paidIn: any = row.getValue(columnId);
      // value => two date input values
      console.log(filterStatuses);
      console.log(paidIn);
      //If one filter defined and date is null filter it
      if (filterStatuses.includes(paidIn)) return true;
      else return false;
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
          className="pl-0"
        >
          Total Amount
          <RiArrowUpDownFill size={16} />
        </Button>
      );
    },
    accessorKey: "totalAmount",
  },
  {
    header: "Discount",
    accessorKey: "discounted",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
          className="pl-0"
        >
          Added Date
          <RiArrowUpDownFill size={16} />
        </Button>
      );
    },
    accessorKey: "datetime",
    cell: ({ row }) => {
      const time = row.getValue("datetime");
      const formatted = new Date(time as string).toLocaleDateString();
      return <div className="">{formatted}</div>;
    },
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses) => {
      const date: any = row.getValue(columnId);
      const [start, end] = filterStatuses.split(","); // value => two date input values
      console.log(start, end);
      //If one filter defined and date is null filter it
      if ((start || end) && !date) return false;
      if (start && !end) {
        return Date.parse(date) >= Date.parse(start);
      } else if (!start && end) {
        return Date.parse(date) <= Date.parse(end);
      } else if (start && end) {
        return (
          Date.parse(date) >= Date.parse(start) &&
          Date.parse(date) <= Date.parse(end)
        );
      } else return true;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const rowdata = row.original;
      const name =
        typeof rowdata.customerD == "object"
          ? rowdata.customerD.first_name
          : "XXXX";
      console.log(name);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <FiMoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(name)}
            >
              Copy Customer Name
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(rowdata.totalAmount.toString())
              }
            >
              Copy Total Price
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="bg-blue-400 text-white mt-2">
              <Link href={`sales/editSales/${rowdata.docId}`}>
                Edit Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="bg-red-400 text-white mt-2"
              onClick={() => deleteSales(rowdata.docId)}
            >
              Delete Sales
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
