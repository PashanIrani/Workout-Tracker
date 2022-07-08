import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = () => {
    axios
      .post("/create-account", {
        name,
        email,
        password,
      })
      .then(() => {
        alert("Account Created");
      })
      .catch((err) => {
        alert("ERROR!!!!! (See console)");
        console.error(err);
      });
  };
  return (
    <div className="Page">
      <h1>Signup:</h1>
      <label htmlFor="email">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        data={name}
        onInput={(e) => {
          setName(e.target.value);
        }}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        name="email"
        id="email"
        data={email}
        onInput={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        data={password}
        onInput={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={createAccount}>Sign Up</button>
    </div>
  );
};

export default SignUp;
