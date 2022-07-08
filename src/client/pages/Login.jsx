import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const performLogin = () => {
    axios
      .post("/login", { email, password })
      .then((response) => {
        console.log(response);
        location.href = "/App/"; // Redirect to main app
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="Page Login">
      <h1>Login:</h1>
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
      <button onClick={performLogin}>Login</button>
    </div>
  );
};

export default Login;
