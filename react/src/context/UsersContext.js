import React, { useState, createContext } from "react";

export const UserContext = createContext();

const iniState = [
  { id: 1, name: "Foo" },
  { id: 2, name: "Bar" },
];

export const UserProvider = (props) => {
  const [data, setData] = useState(iniState);

  return (
    <UserContext.Provider value={[data, setData]}>
      {props.children}
    </UserContext.Provider>
  );
};
