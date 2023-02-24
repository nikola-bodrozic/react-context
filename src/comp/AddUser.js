import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const AddUser = () => {
  const [name, setName] = useState("");
  const [data, setData] = useContext(CartContext);

  const handleChange = (event) => {
    console.log(event.target.name , " has value ", event.target.value);
    if (event.target.name === "username") setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = Math.floor(Math.random() * 1000);
    console.log("name ", name)
    setData((prevData) => [...prevData, { id: id, name: name }]);
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
            onChange={(e)=>handleChange(e)}
          />
        </label>
        <br />
        <pre>{JSON.stringify(data)}</pre>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddUser;
