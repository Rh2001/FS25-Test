//Fix

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {createUser} from "./RegisterComponents/APIUtils/API.jsx";

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [permissionLevel, setPermissionLevel] = useState("1");
  const [errorField, setErrorField] = useState("");
  const [loading, setLoading] = useState(false);

  

  const handleLogin = async (e) => {
    e.preventDefault();

    const missing = [];
    if (!name.trim()) missing.push("name");
    if (!email.trim()) missing.push("email");
    if (!phone.trim()) missing.push("phone");
    if (!address.trim()) missing.push("address");
    if (!password) missing.push("password");

    if (missing.length) {
      alert("Please fill required fields: " + missing.join(", "));
      return;
    }

    const userPayload = {
      name: name.trim(),
      email: email.trim(),
      password,
      phone: phone.trim(),
      age: age ? Number(age) : null,
      address: address.trim(),
      permissionLevel: Number(permissionLevel) || 1,
    };

    try {
      setLoading(true);
      const response = await createUser(userPayload);
      localStorage.setItem("token", response.token);
      navigate("/store");
    } catch (err) {
      console.error("Create user failed:", err);
      alert("Registration failed: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const shakeVariant = {
    shake: {
      x: [0, -8, 8, -6, 6, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans flex flex-col">
      <main className="flex-1 flex items-center justify-center pt-24 pb-12">
        <motion.section
          className="w-full max-w-md mx-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="bg-[#1b1f29]/90 border border-[#2c3342] rounded-2xl shadow-xl backdrop-blur-md overflow-hidden">
            <div className="p-8">
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400 mb-2"
              >
                Register an Account
              </motion.h2>
              <motion.p variants={itemVariants} className="text-gray-400 text-sm mb-6">
                Create an account to access your library and deals.
              </motion.p>

              <form onSubmit={handleLogin} className="space-y-4">
                <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3">
                  <label className="block text-xs text-gray-400">Full name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0f131a] border border-[#2b3240] rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                  />

                  <label className="block text-xs text-gray-400">Email</label>
                  <motion.input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    whileFocus={{
                      scale: 1.01,
                      boxShadow: "0 0 20px rgba(0,191,255,0.15)",
                    }}
                    className={`w-full bg-[#0f131a] border ${
                      errorField === "email" || errorField === "both"
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#2b3240] focus:ring-sky-400"
                    } rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition`}
                  />

                  <label className="block text-xs text-gray-400">Password</label>
                  <motion.input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    whileFocus={{
                      scale: 1.01,
                      boxShadow: "0 0 20px rgba(0,191,255,0.15)",
                    }}
                    className={`w-full bg-[#0f131a] border ${
                      errorField === "password" || errorField === "both"
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#2b3240] focus:ring-cyan-400"
                    } rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition`}
                  />

                  <label className="block text-xs text-gray-400">Phone</label>
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0f131a] border border-[#2b3240] rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Age</label>
                      <input
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full bg-[#0f131a] border border-[#2b3240] rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Permission</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={permissionLevel}
                        onChange={(e) => setPermissionLevel(e.target.value)}
                        className="w-full bg-[#0f131a] border border-[#2b3240] rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                      />
                    </div>
                  </div>

                  <label className="block text-xs text-gray-400">Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#0f131a] border border-[#2b3240] rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2">
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ translateY: -2 }}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-black font-semibold rounded-lg px-4 py-2 shadow-md hover:opacity-90 transition disabled:opacity-50"
                  >
                    {loading ? "Registering..." : "Register"}
                  </motion.button>
                </motion.div>
              </form>
            </div>

            <div className="bg-[#1a1f29]/80 border-t border-[#2b3240] px-6 py-3 text-sm text-gray-500 text-center">
              &copy; {new Date().getFullYear()} Bokhar Store —{" "}
              <a
                href="https://www.linkedin.com/in/roham-h-fasih/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 font-semibold hover:underline hover:text-sky-300 transition-colors duration-300"
              >
                Created by Roham Harandifasih
              </a>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}

export default Login;