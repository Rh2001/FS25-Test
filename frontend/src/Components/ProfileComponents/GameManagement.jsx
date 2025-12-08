import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StoreGamesManagement from "./StoreGamesManagement";
import FeaturedGamesManagement from "./FeaturedGamesManagement";

const GameManagement = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const permRaw = localStorage.getItem("permissionLevel");
    const perm = Number(permRaw ?? "0");

    if (perm !== 1) {
      // Not an admin!: show error and redirect after a moment
      setMessage("Access denied: you do not have permission to view Game Management.");
      setAllowed(false);
      setChecked(true);

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } else {
      setAllowed(true);
      setChecked(true);
    }
  }, [navigate]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  if (!checked) {
    // Small guard when permission check is still ongoing
    return (
      <main className="relative min-h-screen bg-black text-white pt-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-sm text-gray-300">Checking permissions…</div>
        </div>
      </main>
    );
  }

  if (!allowed) {
    // Show explicit error screen for typical users
    return (
      <main className="relative min-h-screen bg-black text-white pt-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="bg-red-900/40 border border-red-700/70 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h1 className="text-2xl font-bold mb-2 text-red-300">
              Access denied
            </h1>
            <p className="text-sm text-red-100">
              You must be an admin to view the Game Management page. Redirecting
              you back to your profile…
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-black text-white pt-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-3xl font-extrabold">Game Management</h1>
          <button
            onClick={() => {
              navigate("/profile");
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-sm"
          >
            ← Back to Profile
          </button>
        </motion.div>

        {/* Store games management component here */}
        <StoreGamesManagement authHeader={authHeader} onMessage={setMessage} />

        {/* Featured games management component here */}
        <FeaturedGamesManagement authHeader={authHeader} onMessage={setMessage} />

        {/* Shared message area for both components */}
        {message && (
          <motion.div
            className="mt-3 mb-6 text-sm text-gray-300 whitespace-pre-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default GameManagement;