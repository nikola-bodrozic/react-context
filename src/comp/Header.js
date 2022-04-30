import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [data] = useContext(CartContext);

  return (
    <>
      <div className="card">
        <ul>
          {data.map((data) => (
            <li key={data.id}>{data.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
