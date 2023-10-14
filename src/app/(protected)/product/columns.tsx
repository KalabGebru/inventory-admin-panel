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
// import { Product } from "@/lib/products";

type Product = {
  image: string;
  id: string;
  invId: string;
  catagory: string;
  datetime: string;
  docId: string;
  details: string;
  unit_price: string;
  product_name: string;
};

async function deleteProduct(id: string) {
  console.log(id);
  const res = await fetch("/api/deleteProduct", {
    method: "POST",
    body: JSON.stringify({ id }),
  });

  if (res.ok) {
    const response = await res.json();
    console.log(response.result);
    if (response.result) window.location.reload();
  }
}

export const columns: ColumnDef<Product>[] = [
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
    header: "Image",
    accessorKey: "image",
    cell: ({ row }) => {
      const imgUrl = row.getValue("image");

      return (
        <Avatar>
          <AvatarImage src={imgUrl as string} />
          <AvatarFallback>PI</AvatarFallback>
        </Avatar>
      );
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
          Product Name
          <RiArrowUpDownFill size={16} />
        </Button>
      );
    },
    accessorKey: "product_name",
  },
  {
    header: "Catagory",
    accessorKey: "catagory",
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses) => {
      if (filterStatuses.length === 0) return true;
      const catagory: any = row.getValue(columnId);
      // value => two date input values
      console.log(filterStatuses);
      console.log(catagory);
      //If one filter defined and date is null filter it
      if (filterStatuses.includes(catagory)) return true;
      else return false;
    },
  },
  {
    header: "Unit Price",
    accessorKey: "unit_price",
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
          Product ID
          <RiArrowUpDownFill size={16} />
        </Button>
      );
    },
    accessorKey: "id",
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
                navigator.clipboard.writeText(rowdata.product_name)
              }
            >
              Copy Product Name
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(rowdata.unit_price)}
            >
              Copy Product Price
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="bg-blue-400 text-white mt-2">
              <Link href={`product/editProduct/${rowdata.docId}`}>
                Edit Details
              </Link>
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
