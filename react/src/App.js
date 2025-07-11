import React from 'react';
import FormValidator from './comp/FormValidator/FormValidator';
import "./App.css";
import AddUser from "./comp/AddUser";
import Header from "./comp/Header";
import { UserProvider } from "./context/UsersContext";
import RenderExcel from './comp/RenderExcel';
import Map from   './comp/Map';
import MockingAxios from './comp/MockingAxios';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Header />
        <AddUser />
        <Map />
      </UserProvider>
      <FormValidator />
      <RenderExcel />
      <MockingAxios />
    </div>
  );
}

export default App;
