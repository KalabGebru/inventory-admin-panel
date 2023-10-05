"use client";
import { Button } from "@/components/ui/button";
// import { Customer } from "@/lib/customers";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FiMoreVertical } from "react-icons/fi";
import { RiArrowUpDownFill } from "react-icons/Ri";
import { Checkbox } from "@/components/ui/checkbox";

type Customer = {
  id: number;
  docId: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  phone_number: string;
  discount: number;
};

export const columns: ColumnDef<Customer>[] = [
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
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
          className="pl-0"
        >
          Customer ID
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
          First Name
          <RiArrowUpDownFill size={16} />
        </Button>
      );
    },
    accessorKey: "first_name",
  },
  {
    header: "Last Name",
    accessorKey: "last_name",
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Phone Number",
    accessorKey: "phone_number",
    cell: ({ row }) => {
      const formatedPhoneNumber = `+25${row.getValue("phone_number")}`;
      return <div className="font-medium">{formatedPhoneNumber}</div>;
    },
  },
  {
    header: "Discount %",
    accessorKey: "discount",
    cell: ({ row }) => {
      const formatedDiscountPercentail = `${row.getValue("discount")}%`;
      return <div className="font-medium">{formatedDiscountPercentail}</div>;
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
                navigator.clipboard.writeText(rowdata.phone_number)
              }
            >
              Copy Phone Number
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(rowdata.email)}
            >
              Copy Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="bg-blue-400 text-white mt-2">
              Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem
              className="bg-red-400 text-white mt-2"
              onClick={() => console.log(rowdata.docId)}
            >
              Delete Customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
