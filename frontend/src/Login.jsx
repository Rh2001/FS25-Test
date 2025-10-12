// Login.jsx
import React from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Login Page</h1>
       <button onClick={() => navigate('/')}>Go back to home</button>
      <p>Please enter your credentials to login.</p>
      
    </div>
  );
}

export default Login;
