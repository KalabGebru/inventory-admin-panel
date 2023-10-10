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
// import { Product } from "@/lib/products";

type Customer = {
  docId: string;
  first_name: string;
  last_name: string;
  credit: { amount: number; used: number };
  email: string;
  gender: string;
  phone_number: string;
  discount: number;
  history: string[];
};

type Product = {
  image: string;
  id: string;
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
  products: Product[];
  customerName: Customer;
  customer: string;
  productId: string;
  datetime: string;
  docId: string;
  discounted: string;
  totalAmount: number;
  paidIn: string;
  items: Items[];
};

async function deleteProduct(id: string) {
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
    accessorKey: "products",
    cell: ({ row }) => {
      const Allproducts: Product[] = row.getValue("products");
      console.log(Allproducts);
      const Allnames = Allproducts.map((g) => g.product_name);

      return <div className="">{Allnames.join(" , ")}</div>;
    },
  },
  {
    header: "Customer Name",
    accessorKey: "customerName",
    cell: ({ row }) => {
      const customer: Customer = row.getValue("customerName");
      return <div className="">{customer.first_name}</div>;
    },
  },
  {
    header: "PaidIn",
    accessorKey: "paidIn",
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
              onClick={() =>
                navigator.clipboard.writeText(rowdata.customerName.last_name)
              }
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
              Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem
              className="bg-red-400 text-white mt-2"
              onClick={() => deleteProduct(rowdata.docId)}
            >
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
