/* The main component for managing games in the admin profile section, combining store and featured games management. */ 

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
    return (
      <main className="relative min-h-screen bg-[#0b0e14] text-white pt-24 px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#140b26] via-[#1b1033] to-[#3b0764]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(216,180,254,0.45),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(56,189,248,0.35),_transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/85" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-sm text-gray-200">Checking permissions…</div>
        </div>
      </main>
    );
  }

  if (!allowed) { // Section for access being denied
    return (
      <main className="relative min-h-screen bg-[#0b0e14] text-white pt-24 px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#140b26] via-[#1b1033] to-[#3b0764]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(216,180,254,0.45),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(56,189,248,0.35),_transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/85" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="bg-gradient-to-br from-red-500/30 via-rose-500/30 to-amber-500/30 border border-red-300/60 rounded-3xl p-6 shadow-[0_20px_60px_rgba(15,23,42,0.9)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h1 className="text-2xl font-bold mb-2 text-red-100">
              Access denied
            </h1>
            <p className="text-sm text-red-50">
              You must be an admin to view the Game Management page. Redirecting
              you back to your profile…
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#0b0e14] text-white pt-24 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#140b26] via-[#1b1033] to-[#3b0764]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(216,180,254,0.45),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(56,189,248,0.35),_transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/85" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 pb-20">
        <motion.div
          className="flex items-center justify-between mb-8 bg-gray-950/60 border border-purple-300/60 rounded-2xl px-5 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.9)] backdrop-blur-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-200 via-fuchsia-200 to-sky-200 bg-clip-text text-transparent">
            Game Management
          </h1>
          <button
            onClick={() => {
              navigate("/profile");
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-500/60 text-sm font-medium text-slate-50 hover:from-slate-800 hover:via-slate-700 hover:to-slate-800 transition-colors"
          >
            ← Back to Profile
          </button>
        </motion.div>

        <div className="mb-8 bg-gradient-to-br from-purple-500/35 via-fuchsia-500/35 to-sky-400/35 border border-purple-300/60 rounded-3xl px-5 py-5 shadow-[0_20px_60px_rgba(15,23,42,0.9)] backdrop-blur-2xl">
          <StoreGamesManagement authHeader={authHeader} onMessage={setMessage} />
        </div>

        <div className="bg-gradient-to-br from-purple-500/35 via-fuchsia-500/35 to-sky-400/35 border border-purple-300/60 rounded-3xl px-5 py-5 shadow-[0_20px_60px_rgba(15,23,42,0.9)] backdrop-blur-2xl">
          <FeaturedGamesManagement authHeader={authHeader} onMessage={setMessage} />
        </div>

        {message && (
          <motion.div
            className="mt-4 text-sm text-rose-100 bg-rose-500/20 border border-rose-300/60 rounded-2xl px-4 py-3 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.8)]"
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