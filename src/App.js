import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import AddUser from "./comp/AddUser";
import Header from "./comp/Header";
import Map from "./comp/Map";

import { CartProvider } from "./context/CartContext";

const getRequest = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

function App() {
  const [task, setTask] = useState("");
  useEffect(() => {
    ///////// reuse getRequest in useEffect
    (async () => {
      // 
      let response = await getRequest();
      setTask(response.title);
    })();
    /////////
  }, []);

  return (
    <div className="App">
      <CartProvider>
        <Header />
        {task}
        <br />
        <AddUser />
        <Map />
      </CartProvider>
    </div>
  );
}

export default App;
