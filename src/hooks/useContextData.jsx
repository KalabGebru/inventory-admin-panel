"use client";
import React, { useContext, useEffect, useState } from "react";

export const TodoDataContext = React.createContext();

export function useTodo() {
  return useContext(TodoDataContext);
}

export function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [catagory, setCatagory] = useState([]);
  const [catagoryLoading, setCatagoryLoading] = useState(true);
  const [customer, setCustomer] = useState([]);
  const [customerLoading, setCustomerLoading] = useState(true);
  const [inventory, setInventory] = useState([]);
  const [inventoryLoading, setInventoryLoading] = useState(true);
  const [sales, setSales] = useState([]);
  const [salesLoading, setSalesLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  function fetchAllPagedata() {
    console.log("ff");
    setProductsLoading(true);
    setCatagoryLoading(true);
    setCustomerLoading(true);
    setInventoryLoading(true);
    setSalesLoading(true);
    setUsersLoading(true);
    fetch("/api/getAllPagesData")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInventory(data.Inventory);
        setProducts(data.Products);
        setCatagory(data.Catagorys);
        setCustomer(data.Customers);
        setSales(data.Sales);
        setUsers(data.Users);
        //////
        setProductsLoading(false);
        setCatagoryLoading(false);
        setCustomerLoading(false);
        setInventoryLoading(false);
        setSalesLoading(false);
        setUsersLoading(false);
      })
      .catch((err) => {
        setProductsLoading(undefined);
        setCatagoryLoading(undefined);
        setCustomerLoading(undefined);
        setInventoryLoading(undefined);
        setSalesLoading(undefined);
        setUsersLoading(undefined);
        console.log(err);
      });
  }

  useEffect(() => {
    console.log("ff");
    fetchAllPagedata();
  }, []);

  return (
    <TodoDataContext.Provider
      value={{
        products,
        setProducts,
        productsLoading,
        setProductsLoading,
        catagory,
        setCatagory,
        catagoryLoading,
        setCatagoryLoading,
        customer,
        setCustomer,
        customerLoading,
        setCustomerLoading,
        inventory,
        setInventory,
        inventoryLoading,
        setInventoryLoading,
        sales,
        setSales,
        salesLoading,
        setSalesLoading,
        users,
        setUsers,
        usersLoading,
        setUsersLoading,
      }}
    >
      {children}
    </TodoDataContext.Provider>
  );
}
