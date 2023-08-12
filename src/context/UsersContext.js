import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [data, setData] = useState([
    { id: 1, name: "Foo" },
    { id: 2, name: "Bar" },
  ]);

  return (
    <UserContext.Provider value={[data, setData]}>
      {props.children}
    </UserContext.Provider>
  );
};
