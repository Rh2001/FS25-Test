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

    // Simple validation
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

    localStorage.setItem("isLoggedIn", "true");
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
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans flex flex-col">
      

      {/* Login content */}
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
                Login to Your Account
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-gray-400 text-sm mb-6"
              >
                Access your digital game library and personalized deals.
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
                  <label className="block text-xs text-gray-400 mb-1">
                    Email
                  </label>
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
                  <label className="block text-xs text-gray-400 mb-1">
                    Password
                  </label>
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
                </motion.div>

                {/* Login Button */}
                <motion.div variants={itemVariants} className="pt-2">
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ translateY: -2 }}
                    className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-black font-semibold rounded-lg px-4 py-2 shadow-md hover:opacity-90 transition"
                  >
                    Login
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
           className="text-sky-400 font-semibold hover:underline hover:text-sky-300 transition-colors duration-300">
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
