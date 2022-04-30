import React from "react";
import "./App.css";

import AddUser from "./comp/AddUser";
import Header from "./comp/Header";
import Map from "./comp/Map";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Header />
        <AddUser />
        <Map />
      </CartProvider>
    </div>
  );
}

export default App; 
