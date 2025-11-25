import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Blank error.
    if (!form.email.trim() || !form.password) {
      setError("Email and password required."); // Fields are empty.
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://localhost:443/api/user/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || "Login failed.");
      } else {
        localStorage.setItem("token", data.token); // Save JWT if needed
        navigate("/store");
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400 mb-6">
        Login
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs text-gray-400">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={update}
            className="w-full bg-[#0f131a] border border-[#2b3240] rounded-lg px-3 py-2 text-sm placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={form.password}
            onChange={update}
            className="w-full bg-[#0f131a] border border-[#2b3240] rounded-lg px-3 py-2 text-sm placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            placeholder="********"
          />
        </div>
        {error && <div className="text-red-500 text-xs">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-black font-semibold rounded-lg px-4 py-2 shadow-md hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="text-sky-400 font-semibold hover:underline hover:text-sky-300 transition-colors duration-300"
        >
          Not a bokhari yet? Register
        </button>
      </div>
    </div>
  );
}