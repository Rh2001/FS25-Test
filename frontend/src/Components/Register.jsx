import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createUser } from "./RegisterComponents/APIUtils/API.jsx";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [permissionLevel, setPermissionLevel] = useState("1");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (age < 0){
      setErrorMessage("Age cannot be a negative number.");
      return;}
    if (age < 18){
      setErrorMessage("You must be 18 or older to register."); return;}
    setErrorMessage("");
    setSuccessMessage("");

    const missingFields = [];
    if (!name.trim()) missingFields.push("Name");
    if (!email.trim()) missingFields.push("Email");
    if (!password) missingFields.push("Password");
    if (!phone.trim()) missingFields.push("Phone");
    if (!address.trim()) missingFields.push("Address");

    if (missingFields.length > 0) {
      setErrorMessage(`Please fill in: ${missingFields.join(", ")}`);
      return;
    }

    const userPayload = {
      name: name.trim(),
      email: email.trim(),
      password,
      phone: phone.trim(),
      age: age ? Number(age) : 0,
      address: address.trim(),
      permissionLevel: Number(permissionLevel) || 1,
    };

    try {
      setLoading(true); // Set loading state to true.
      const response = await createUser(userPayload); // Await response from backend.
      window.scrollTo({top: 0, behavior: "smooth"}); // Scroll to top of page.
      setSuccessMessage("Registration successful! Redirecting...");
      localStorage.setItem("token", response.token);

      setTimeout(() => navigate("/store"), 1500); // Auto redirect after success.
    } catch (err) {
      console.error("Create user failed:", err);
      setErrorMessage(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const shakeVariant = {
    shake: { x: [0, -8, 8, -6, 6, 0], transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } },
  };

  const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans flex flex-col">
      <main className="flex-1 flex items-center justify-center pt-24 pb-12">
        <motion.section className="w-full max-w-md mx-4" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div className="bg-[#1b1f29]/90 border border-[#2c3342] rounded-2xl shadow-xl backdrop-blur-md overflow-hidden">
            <div className="p-8">
              <motion.h2 variants={itemVariants} className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400 mb-2">
                Become a Bokhari
              </motion.h2>
              <motion.p variants={itemVariants} className="text-gray-400 text-sm mb-6">
                Create an account to access your personal library and deals.
              </motion.p>

              {/* Error Message */}
              {errorMessage && (
                <motion.div variants={shakeVariant} className="bg-red-600 text-white px-4 py-2 mb-4 rounded">
                  {errorMessage}
                </motion.div>
              )}

              {/* Success Message */}
              {successMessage && (
                <motion.div variants={shakeVariant} className="bg-green-600 text-white px-4 py-2 mb-4 rounded">
                  {successMessage}
                </motion.div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
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
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0f131a] border border-[#2b3240] rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                  />

                  <label className="block text-xs text-gray-400">Password</label>
                  <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0f131a] border border-[#2b3240] rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                  />

                  <label className="block text-xs text-gray-400">Phone</label>
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0f131a] border border-[#2b3240] rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                  />

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Age</label>
                      <input
                        type="number"
                        placeholder="Age"
                        min = {1} // No negatives this way
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
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

export default Register;
