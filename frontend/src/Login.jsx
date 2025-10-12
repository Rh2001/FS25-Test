// Login.jsx
import React from "react";
import "./HomePage.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login without backend
    console.log("Logging in with:", email, password);
    alert("Login successful!");
    navigate("/");
  };

  return (
    <div className="container">
      <header className="navbar">
        <h1 className="logo">Bokhar Store</h1>
        <nav>
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/login")}>Login</button>
          <button>Store</button>
          <button>Contact</button>
        </nav>
      </header>

      <section className="login-section">
        <div className="login-box">
          <h2>Login to Your Account</h2>
          <form onSubmit={handleLogin} className="login-form">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn-primary">
              Login
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Bokhar Store - Roham Harandifasih. All rights reserved.
      </footer>
    </div>
  );
}

export default Login;