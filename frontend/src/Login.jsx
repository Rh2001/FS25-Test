import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorField, setErrorField] = useState(""); // 'email', 'password', or 'both'

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock validation
    if (!email) {
      setErrorField("email");
      setTimeout(() => setErrorField(""), 800);
      return;
    }
    if (!password) {
      setErrorField("password");
      setTimeout(() => setErrorField(""), 800);
      return;
    }
    
    sessionStorage.setItem("isLoggedIn", "true");
    alert("✅ Login successful!");
    navigate("/");
  };

  // Animation variants
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
    <div className="min-h-screen bg-[#0b0b0c] text-white font-inter flex flex-col">
      {/* Navbar */}
      <header className="bg-neutral-900/60 backdrop-blur-sm fixed w-full z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-extrabold text-yellow-400">
            Bokhar Store
          </h1>
          <nav className="space-x-4 text-gray-300">
            <button onClick={() => navigate("/")} className="hover:text-yellow-400">
              Home
            </button>
            <button onClick={() => navigate("/login")} className="hover:text-yellow-400">
              Login
            </button>
            <button className="hover:text-yellow-400">Store</button>
          </nav>
        </div>
      </header>

      {/* Login content */}
      <main className="flex-1 flex items-center justify-center pt-24 pb-12">
        <motion.section
          className="w-full max-w-md mx-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden">
            <div className="p-8">
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-extrabold text-yellow-400 mb-2"
              >
                Login to Your Account
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-gray-300 text-sm mb-6"
              >
                Enter your credentials to access your store dashboard.
              </motion.p>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Field */}
                <motion.div
                  variants={
                    errorField === "email" || errorField === "both"
                      ? shakeVariant
                      : itemVariants
                  }
                  animate={
                    errorField === "email" || errorField === "both"
                      ? "shake"
                      : "visible"
                  }
                >
                  <label className="block text-xs text-gray-300 mb-1">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    whileFocus={{
                      scale: 1.01,
                      boxShadow: "0 6px 20px rgba(250,204,21,0.08)",
                    }}
                    className={`w-full bg-[#0f0f10] border ${
                      errorField === "email" || errorField === "both"
                        ? "border-red-500 focus:ring-red-500"
                        : "border-neutral-800 focus:ring-yellow-400"
                    } rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition`}
                  />
                </motion.div>

                {/* Password Field */}
                <motion.div
                  variants={
                    errorField === "password" || errorField === "both"
                      ? shakeVariant
                      : itemVariants
                  }
                  animate={
                    errorField === "password" || errorField === "both"
                      ? "shake"
                      : "visible"
                  }
                >
                  <label className="block text-xs text-gray-300 mb-1">
                    Password
                  </label>
                  <motion.input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    whileFocus={{
                      scale: 1.01,
                      boxShadow: "0 6px 20px rgba(250,204,21,0.08)",
                    }}
                    className={`w-full bg-[#0f0f10] border ${
                      errorField === "password" || errorField === "both"
                        ? "border-red-500 focus:ring-red-500"
                        : "border-neutral-800 focus:ring-yellow-400"
                    } rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition`}
                  />
                </motion.div>

                {/* Button */}
                <motion.div variants={itemVariants} className="pt-2">
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ translateY: -2 }}
                    className="w-full bg-yellow-400 text-black font-semibold rounded-lg px-4 py-2 shadow-sm hover:bg-yellow-300 transition"
                  >
                    Login
                  </motion.button>
                </motion.div>
              </form>
            </div>

            <div className="bg-neutral-800/60 px-6 py-3 text-sm text-gray-400 text-center">
              &copy; {new Date().getFullYear()} Bokhar Store — Roham Harandifasih
            </div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}

export default Login;
