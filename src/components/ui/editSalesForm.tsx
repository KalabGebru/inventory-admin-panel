"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { Combobox } from "./Combobox";
import { ComboboxProduct } from "./ComboboxProduct";
import { Card, CardContent } from "./card";
import Image from "next/image";
import { Checkbox } from "./checkbox";
import { useTodo } from "@/hooks/useContextData";
import { toast } from "sonner";

type Sales = {
  customer: string;
  items: ItemsO[];
  totalAmount: number;
  docId: string;
  paidIn: string;
  datetime: string;
  discounted: boolean;
};

type ItemsO = { no: number; productId: string };

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

type Inventory = {
  productId: string;
  datetime: string;
  docId: string;
  currentAmount: number;
  history: [{ addedAmount: number; datetime: string }];
};

type Props = {
  customers: Customer[];
  product: Product[];
  sales: Sales;
};

type Items = {
  productId: string;
  product: Product;
  no: number;
};

export default function EditSalesForm({ customers, product, sales }: Props) {
  const { setSales, setSalesLoading } = useTodo();
  const [sending, setSending] = useState(false);
  const selectedCustomer = customers.find(
    (c) => c.docId === sales.customer
  ) as Customer;
  const oldItem = sales.items.map((item) => {
    return {
      ...item,
      product: product.find((p) => p.docId == item.productId),
    };
  }) as Items[];
  const defaultProducts = sales.items.map((item) =>
    product.find((p) => p.docId == item.productId)
  ) as Product[];
  const [customer, setCustomer] = useState<Customer | undefined>(
    selectedCustomer
  );
  const [items, setItems] = useState<Items[]>(oldItem);
  const [paidIn, setPaidIn] = useState(sales?.paidIn);
  const [discounted, setDiscounted] = useState(sales?.discounted);

  const router = useRouter();
  let Total: number = 0;
  items.forEach(
    (item) =>
      (Total =
        Total +
        Math.floor(
          Number(item.product.unit_price.replace(/[^0-9.-]+/g, "")) * item.no
        ))
  );

  console.log(Total);

  function fetchSalesdata() {
    setSalesLoading(true);
    fetch("/api/getSales")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSales(data.Sales);
        setSalesLoading(false);
      })
      .catch((err) => {
        setSalesLoading(undefined);
        console.log(err);
      });
  }

  async function EditSales() {
    if (items.length == 0) {
      throw Error(`you haven't selected products`);
    }
    if (
      selectedCustomer &&
      paidIn === "credit" &&
      selectedCustomer.credit.max != 0
    ) {
      let left;
      if (sales.paidIn == "credit") {
        left =
          selectedCustomer.credit.max -
          selectedCustomer.credit.used +
          sales.totalAmount;
      } else {
        left = selectedCustomer.credit.max - selectedCustomer.credit.used;
      }

      if (Total > left)
        throw Error(
          `the customer only has ${left} credits. Maybe use mixed and pay the rest ${
            Total - left
          } in cash`
        );
    }

    const senddata = {
      customer: customer?.docId,
      items: items.map((item) => {
        return { productId: item.productId, no: item.no };
      }),
      totalAmount: Total,
      paidIn: paidIn,
      discounted: discounted,
      salesId: sales.docId,
    };
    console.log(senddata);

    const res = await fetch("/api/editSales", {
      method: "POST",
      body: JSON.stringify(senddata),
    });

    if (res.ok) {
      const response = await res.json();
      console.log(response);
      if (response.result.edited) {
        fetchSalesdata();
        router.push(`/sales/`);
        return response.result.edited;
      }
    }
    throw Error("error");
  }

  async function onSubmit() {
    setSending(true);
    toast.promise(EditSales(), {
      loading: "sending data ...",
      success: (res) => {
        setSending(false);
        return `Sales has been added`;
      },
      error: (err) => {
        setSending(false);
        return err.message;
      },
    });
  }

  function subtruct(id: string) {
    setItems((pre) => {
      return pre.map((item) => {
        if (item.productId == id && item.no > 1) {
          return { ...item, no: item.no - 1 };
        }
        return item;
      });
    });
  }

  function add(id: string) {
    setItems((pre) => {
      return pre.map((item) => {
        if (item.productId == id) {
          return { ...item, no: item.no + 1 };
        }
        return item;
      });
    });
  }
  return (
    <div className="w-full max-w-3xl m-4 flex flex-col gap-4 p-8 border rounded-md ">
      <div className="text-xl mb-8">Add a Sales</div>
      <div className="">
        <div className="mb-2 ">Customer:</div>
        <Combobox
          list={customers}
          setCustomer={setCustomer}
          defultValue={sales.customer}
        />
      </div>
      <div className="">
        <div className="mb-2 ">Product:</div>
        <ComboboxProduct
          list={product}
          setItems={setItems}
          defultValue={defaultProducts}
        />
      </div>

      <div className="mt-8">
        <div className="mb-4 "> Selected Customer:</div>
        {customer ? (
          <div className="flex flex-col gap-4">
            <Card className="w-full max-w-xl">
              <CardContent className="flex flex-col gap-2 p-4">
                <div className="">
                  <span className="bg-gray-400 p-1 rounded">FirstName:</span>
                  {` ${customer.first_name}`}
                </div>
                <div className="">
                  <span className="bg-gray-400 p-1 rounded">LastName:</span>
                  {` ${customer.last_name}`}
                </div>
                <div className="">
                  <span className="bg-gray-400 p-1 rounded">PhoneNumber:</span>
                  {` ${customer.phone_number}`}
                </div>
                <div className="">
                  <span className="bg-gray-400 p-1 rounded">Email:</span>
                  {` ${customer.email}`}
                </div>
                {customer.credit.allowed && (
                  <div className="">
                    <span className="bg-gray-400 p-1 rounded">Credit:</span>
                    {` ${customer.credit.max}-${customer.credit.used}`}
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="flex">
              <Button
                variant="secondary"
                onClick={() => setCustomer(undefined)}
              >
                Clear Customer
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-gray-400">unregisterd</div>
        )}
      </div>
      <div className="flex flex-col my-8 gap-4">
        <div className="">Added Products:</div>
        {items.length !== 0 ? (
          items.map((item: Items) => {
            return (
              <Card className="w-full max-w-xl">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Image
                      src={item.product.image}
                      alt={item.product.product_name}
                      width={100}
                      height={300}
                    />
                    <div className="flex flex-col gap-2 w-full">
                      <h1>{item.product.product_name}</h1>
                      <div className="line-clamp-1">{item.product.details}</div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div
                            className="flex items-center justify-center border cursor-pointer border-green-300 rounded w-8 h-8"
                            onClick={() => subtruct(item.productId)}
                          >
                            -
                          </div>
                          <span>{item.no}</span>
                          <div
                            className="flex items-center justify-center border cursor-pointer border-green-300 rounded w-8 h-8"
                            onClick={() => add(item.productId)}
                          >
                            +
                          </div>
                        </div>
                        <div className="">{item.product.unit_price}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-gray-400">No products have been selected</div>
        )}
        {Total != 0 && <div>Total:{Total}</div>}
      </div>

      <div className="flex items-center gap-4 mb-2">
        <Checkbox
          id="Discount"
          checked={discounted}
          onCheckedChange={() => setDiscounted((pre) => !pre)}
        />
        <label htmlFor="Discount">Applay discount</label>
      </div>
      {customer?.credit.allowed ? (
        <div className="flex items-center gap-4">
          <span>PaidIn:</span>
          <Select
            onValueChange={(value) => setPaidIn(value)}
            defaultValue={paidIn}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="PaidIn" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="credit">Credit</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <span>PaidIn:</span>
          <Select
            onValueChange={(value) => setPaidIn(value)}
            defaultValue={paidIn}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="PaidIn" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">Cash</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex justify-end">
        <Button disabled={sending} onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
