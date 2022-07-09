import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import '../styles/Login-Signup.scss';
import { getURLParams } from "../helpers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const params = getURLParams();
    console.log(params);
    if ('new' in params) {
      setSuccessMessage("Account Created! Please login to continue! 💪");
    }
  },[]);

  const performLogin = () => {
    axios
      .post("/login", { email, password })
      .then((response) => {
        console.log(response);
        location.href = "/App/"; // Redirect to main app
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.response.data);
      });
  };

  const submit = (e) => {
    if (e.key === 'Enter') {
      performLogin();
    }
  }

  return (
    <div className="Page Login">
      <p className="success-message">{successMessage}</p>
      <h1>Login</h1>
      {errorMessage !== '' && (<p className="error-message"><AiOutlineCloseCircle onClick={() => setErrorMessage("")}/> {errorMessage}</p>)}
      <div className="form-container">
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
          <button onClick={performLogin}>Login</button>
        </div>
        <div>
          <a href="/signup">Don't have an account? Sign up!</a>
        </div>
      </div>
     
    </div>
  );
};

export default Login;
