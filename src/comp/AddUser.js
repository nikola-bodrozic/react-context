import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const AddUser = () => {
  const [name, setName] = useState("");
  const [data, setData] = useContext(CartContext);
  const handleChange = (event) => {
    if (event.target.name === "username") setName(event.target.value);
  };

  let id = Math.floor(Math.random() * 1000);
  const handleSubmit = (event) => {
    event.preventDefault();
    setData((prevData) => [...data, { id: id, name: name }]);
  };

  return (
    <div className="card">
      {" "}
      <form onSubmit={handleSubmit}>
        <label>
          Add user{" "}
          <input
            type="text"
            name="username"
            value={name}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddUser;
