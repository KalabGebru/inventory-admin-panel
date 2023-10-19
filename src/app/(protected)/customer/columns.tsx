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
import Link from "next/link";
// import { Customer } from "@/lib/customers";

type credit = { allowed: boolean; max: number; used: number };

type Customer = {
  docId: string;
  first_name: string;
  last_name: string;
  credit: credit;
  email: string;
  gender: string;
  phone_number: string;
  discount: number;
  history: string[];
};

async function deleteCustomer(id: string) {
  console.log(id);
  const res = await fetch("/api/deleteCustomer", {
    method: "POST",
    body: JSON.stringify({ id }),
  });

  if (res.ok) {
    const response = await res.json();
    console.log(response.result);
    window.location.reload();
  }
}

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
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
          className="pl-0"
        >
          Discount %
          <RiArrowUpDownFill size={16} />
        </Button>
      );
    },
    accessorKey: "discount",
    cell: ({ row }) => {
      const formatedDiscountPercentail = `${row.getValue("discount")}%`;
      return <div className="font-medium">{formatedDiscountPercentail}</div>;
    },
  },
  {
    header: "Credit Allowed",
    accessorKey: "credit",
    cell: ({ row }) => {
      const credit: credit = row.getValue("credit");
      return credit.allowed ? (
        <div className="flex w-16 items-center justify-center bg-green-400 font-bold rounded rouned text-green-900">
          <div className="">True</div>
        </div>
      ) : (
        <div className="flex w-16 items-center justify-center bg-red-400 font-bold rounded text-red-900">
          <div className="">False</div>
        </div>
      );
    },
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses) => {
      if (filterStatuses.length === 0) return true;
      const credit: any = row.getValue(columnId);
      // value => two date input values
      console.log(filterStatuses);
      console.log(credit);
      //If one filter defined and date is null filter it
      if (filterStatuses.includes(credit.allowed)) return true;
      else return false;
    },
  },
  {
    header: "Credit used",
    accessorKey: "credit",
    cell: ({ row }) => {
      const credit: credit = row.getValue("credit");
      return (
        <div className="font-medium">{credit.allowed ? credit.used : null}</div>
      );
    },
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses) => {
      if (filterStatuses.length === 0) return true;
      const credit: any = row.getValue(columnId);
      // value => two date input values
      console.log(filterStatuses);
      console.log(credit);
      //If one filter defined and date is null filter it
      if (filterStatuses.includes(credit.allowed)) return true;
      else return false;
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
              <Link href={`customer/editCustomer/${rowdata.docId}`}>
                Edit Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="bg-red-400 text-white mt-2"
              onClick={() => deleteCustomer(rowdata.docId)}
            >
              Delete Customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
