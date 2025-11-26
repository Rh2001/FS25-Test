// ...existing imports...
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || "https://localhost:443"}/api/User/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Login failed.");
        return;
      }

      // Save token + username to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user?.name) {
        localStorage.setItem("username", data.user.name);
      }

      // Go back to homepage
      console.log("Login successful", localStorage.getItem("username"));
      navigate("/");
    } catch (err) {
      setError("Could not connect to server.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full rounded-md px-3 py-2 bg-gray-800 text-white"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full rounded-md px-3 py-2 bg-gray-800 text-white"
      />
      <button
        type="submit"
        className="w-full py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-semibold"
      >
        Login
      </button>
        <div className="mt-2 text-center">
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="text-sky-400 font-semibold hover:underline hover:text-sky-300 transition-colors duration-300"
        >
          Not a bokhari yet? Register
        </button>
      </div>

    </form>
  );
};

export default LoginForm;