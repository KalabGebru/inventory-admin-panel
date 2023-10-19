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

type InventoryViewData = {
  product_name: string;
  catagory: string;
  image: string;
  productId: string;
  datetime: string;
  docId: string;
  currentAmount: number;
  history: [
    {
      addedAmount: number;
      datetime: string;
    }
  ];
};

async function deleteInventory(id: string, productId: string) {
  console.log(id);
  const res = await fetch("/api/deleteInventory", {
    method: "POST",
    body: JSON.stringify({ id, productId }),
  });

  if (res.ok) {
    const response = await res.json();
    console.log(response.result);
    window.location.reload();
  }
}

export const columns: ColumnDef<InventoryViewData>[] = [
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
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
          className="pl-0"
        >
          Current Amount
          <RiArrowUpDownFill size={16} />
        </Button>
      );
    },
    accessorKey: "currentAmount",
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
          Last Added Date
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
              onClick={() => navigator.clipboard.writeText(rowdata.docId)}
            >
              Copy Product Name
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(rowdata.currentAmount.toString())
              }
            >
              Copy Product Price
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="bg-green-400 text-white mt-2">
              <Link href={`/inventory/addInventory/${rowdata.docId}`}>
                View & Add Inventory
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="bg-blue-400 text-white mt-2">
              <Link href={`/inventory/editInventory/${rowdata.docId}`}>
                View & Edit Inventory
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="bg-red-400 text-white mt-2"
              onClick={() => deleteInventory(rowdata.docId, rowdata.productId)}
            >
              Delete Inventory
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
