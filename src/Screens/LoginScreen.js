import React, { useState } from "react";
import axios from "axios";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, seterror] = useState();

  async function login(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      const result = (await axios.post("http://localhost:5000/login", user)).data;
      localStorage.setItem("token", result.token);
      localStorage.setItem("currentUser", JSON.stringify(result));
      localStorage.setItem("userName", result.name);
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      seterror(true);
    }
  }

  return (
    <div>
      <h2>Login Screen</h2>

      {error && <h1 style={{ color: "red" }}>Invalid email</h1>}

      <input
        type="email"
        className="form-control"
        placeholder="enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        className="form-control"
        placeholder="enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="reg-btn" onClick={login}>
        login
      </button>
    </div>
  );
}


export default LoginScreen;

