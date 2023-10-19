"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "./scroll-area";
import Image from "next/image";

// const frameworks = [
//   {
//     value: "next.js",
//     label: "Next.js",
//   },
//   {
//     value: "sveltekit",
//     label: "SvelteKit",
//   },
//   {
//     value: "nuxt.js",
//     label: "Nuxt.js",
//   },
//   {
//     value: "remix",
//     label: "Remix",
//   },
//   {
//     value: "astro",
//     label: "Astro",
//   },
// ];

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

type Props = {
  list: Product[];
  setItems: any;
  defultValue?: Product[];
};
export function ComboboxProduct({ list, setItems, defultValue }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defultValue ? defultValue : []);
  console.log(value);
  const FW = list.map((c) => {
    return {
      value: c.docId,
      label: c.product_name,
      productId: c.id,
      image: c.image,
    };
  });
  console.log(FW);

  function addproduct() {
    console.log(value);
    setItems((pre: any) => {
      return value.map((v: Product) => {
        const exist = pre.find((p: any) => p?.productId === v?.docId);
        if (exist) {
          return { productId: v.docId, product: exist.product, no: exist.no };
        } else {
          return { productId: v.docId, product: v, no: 1 };
        }
      });
    });
    // setItems()
  }

  return (
    <div className="flex gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-96 justify-between"
          >
            {value.length !== 0
              ? list.find((framework) =>
                  value.find((v: any) => v.docId == framework.docId)
                )?.product_name
              : "Select Products..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className=" w-96 p-0">
          <ScrollArea className="max-h-96 h-96 w-96 rounded-md border">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {list.map((framework) => (
                  <CommandItem
                    key={framework.docId}
                    value={framework.product_name}
                    onSelect={() => {
                      const arr: any = value;
                      const found = arr.find(
                        (a: any) => a.docId === framework.docId
                      );
                      if (!found) {
                        //checking weather array contain the id
                        arr.push(framework); //adding to array because value doesnt exists
                      } else {
                        arr.splice(arr.indexOf(framework), 1); //deleting
                      }
                      console.log(arr);
                      // setCatagoryFilter([...arr]);
                      // console.log(catagoryFilter);
                      setValue(arr);
                      setOpen(false);
                    }}
                  >
                    {" "}
                    <Check
                      className={cn(
                        "mr-2 h-8 w-8",
                        value.find((v: any) => v.docId === framework.docId)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <div className="flex gap-2 border rounded p-2 w-full mr-4">
                      <div className="min-w-[50px] w-fit">
                        <Image
                          src={framework.image}
                          alt={framework.product_name}
                          width={50}
                          height={100}
                          className="w-full h-full bg-cover"
                        />
                      </div>
                      <div className="">
                        <div className="line-clamp-1 text-lg">
                          {framework.product_name}
                        </div>
                        <div className="line-clamp-2">{framework.details}</div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </ScrollArea>
        </PopoverContent>
      </Popover>
      <Button onClick={addproduct}>Add Product</Button>
    </div>
  );
}