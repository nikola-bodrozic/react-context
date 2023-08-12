import React, { useContext } from "react";
import { UserContext } from "../context/UsersContext";

const Navbar = () => {
  const [data] = useContext(UserContext);

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
