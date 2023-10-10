"use client";
import React from "react";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { LiaProductHunt } from "react-icons/lia";
import { MdInventory } from "react-icons/Md";
import { LuClipboardList } from "react-icons/Lu";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavMenu = [
  {
    href: "/",
    text: "Home",
    icon: <FaHome className="w-6 h-6 " />,
  },
  {
    href: "/product",
    text: "Product",
    icon: <LiaProductHunt className="w-6 h-6" />,
  },
  {
    href: "/customer",
    text: "Customer",
    icon: <FaUsers className="w-6 h-6" />,
  },
  {
    href: "/inventory",
    text: "Inventory",
    icon: <MdInventory className="w-6 h-6" />,
  },
  {
    href: "/sales",
    text: "Sales",
    icon: <LuClipboardList className="w-6 h-6" />,
  },
];

export default function SideNavbar() {
  const path = usePathname();

  return (
    <div className="sticky min-h-screen top-0 flex flex-col p-4 pt-24 border-r-2 w-72 h-full">
      <ul className="flex flex-col gap-2">
        {NavMenu.map((menu, i) => {
          return (
            <li key={i} className="w-full ">
              <Link
                href={menu.href}
                className={`flex items-center w-full h-12 md:h-10 gap-3 px-4 py-1 rounded-lg hover:bg-black/10 ${
                  menu.href == path
                    ? "dark:bg-white bg-black text-white dark:text-black"
                    : "text-black dark:text-white"
                }`}
              >
                {menu.icon}
                <span className="text-base lg:text-xl">{menu.text}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
