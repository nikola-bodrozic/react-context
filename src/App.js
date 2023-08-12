import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import AddUser from "./comp/AddUser";
import Header from "./comp/Header";

import { UserProvider } from "./context/UsersContext";
import RenderExcel from './comp/RenderExcel';

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
    (async () => {
      // 
      let response = await getRequest();
      setTask(response.title);
      //
    })();
  }, []);



  return (
    <div className="App">
      <UserProvider>
        <Header />
        <div className="card">
          {task}
        </div>
        <AddUser />
        <RenderExcel />
      </UserProvider>
    </div>
  );
}

export default App;

