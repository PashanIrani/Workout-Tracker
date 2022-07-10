import React, { useState } from "react";
import axios from "axios";
import "../styles/Login-Signup.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const createAccount = () => {
    axios
      .post("/create-account", {
        name,
        email,
        password,
      })
      .then(() => {
        location.href = "/login?new";
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.response.data);
      });
  };

  const submit = (e) => {
    if (e.key === "Enter") {
      createAccount();
    }
  };

  return (
    <div className="Page Signup">
      <h1>Sign Up!</h1>
      {errorMessage !== "" && (
        <p className="error-message">
          <AiOutlineCloseCircle onClick={() => setErrorMessage("")} />{" "}
          {errorMessage}
        </p>
      )}
      <div className="form-container">
        <div>
          <label htmlFor="email">Name:</label>
          <input
            placeholder="Joe Smith"
            type="text"
            name="name"
            id="name"
            data={name}
            onKeyDown={submit}
            onInput={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="joe@email.com"
            type="text"
            name="email"
            id="email"
            data={email}
            onKeyDown={submit}
            onInput={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            placeholder="**********"
            type="password"
            name="password"
            id="password"
            data={password}
            onKeyDown={submit}
            onInput={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button onClick={createAccount}>Sign Up</button>
        </div>
        <div>
          <a href="/login">Already have an account? Login!</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
