import React, { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [data, setData] = useState([
    { id: 1, name: "Foo" },
    { id: 2, name: "Bar" },
  ]);

  return (
    <CartContext.Provider value={[data, setData]}>
      {props.children}
    </CartContext.Provider>
  );
};
