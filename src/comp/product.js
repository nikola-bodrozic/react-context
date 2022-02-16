import React, { useContext } from "react";
import { CartContext } from '../context/CartContext'

export default function Product() {
  const value = useContext(CartContext);
  return (<div className="card">
    <h3>DVD</h3>
    <button data-testid={`btn-cart1`} onClick={value.incrProd}>add to cart</button>
    <button data-testid={`btn-wish1`} onClick={value.incrWishs}>add to wish list</button>
  </div>)
}


