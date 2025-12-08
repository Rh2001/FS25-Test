import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import profBG01 from "../GlobalAssets/profBG01.jpg";
import profBG02 from "../GlobalAssets/profBG02.jpg";
import ProfileHeader from "./ProfileHeader";
import ProfilePurchases from "./ProfilePurchases";
import ProfileSections from "./ProfileSections";
import { sectionVariants } from "../GlobalFunctions/Variants";

const API_BASE = process.env.REACT_APP_API_URL || "https://localhost:443";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [permission, setPermission] = useState(0);
  const [purchased, setPurchased] = useState([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [purchaseError, setPurchaseError] = useState("");
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("username");
    const permRaw = localStorage.getItem("permissionLevel");

    if (!token || !name) {
      navigate("/login");
      return;
    }

    setUsername(name);
    setPermission(Number(permRaw ?? 0));
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const load = async () => {
      try {
        setLoadingPurchases(true);
        setPurchaseError("");

        const res = await fetch(`${API_BASE}/api/user/purchases`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          setPurchaseError(
            `Error ${res.status}: ${text || res.statusText || "Unknown"}`
          );
          return;
        }

        const data = await res.json();
        setPurchased(Array.isArray(data) ? data : []);
      } catch (err) {
        setPurchaseError(
          err instanceof Error ? err.message : "Failed to load purchases."
        );
      } finally {
        setLoadingPurchases(false);
        setContentReady(true);
      }
    };

    load();
  }, []);

  const isAdmin = permission === 1;
  const profileBg = isAdmin ? profBG01 : profBG02;

  const Background = () => (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <img
        src={profileBg}
        alt="Profile Background"
        className="w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#140b26] via-[#1b1033] to-[#3b0764] mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(216,180,254,0.5),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(56,189,248,0.35),_transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/85" />
    </div>
  );

  if (!contentReady) {
    return (
      <main className="relative min-h-screen bg-[#0b0e14] text-white pt-24 px-6 overflow-hidden">
        <Background />
        <div className="max-w-6xl mx-auto relative z-10 flex items-start justify-center">
          <div className="mt-10 text-gray-100 text-sm">
            Loading your library…
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#0b0e14] text-white pt-24 px-6 overflow-hidden">
      <Background />
      <motion.div
        className="max-w-6xl mx-auto relative z-10 pb-20"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-10 bg-gradient-to-br from-purple-500/40 via-fuchsia-500/40 to-sky-400/40 border border-purple-300/60 rounded-3xl px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.9)] backdrop-blur-2xl">
          <ProfileHeader isAdmin={isAdmin} username={username} />
        </div>

        <div className="mb-10 bg-gradient-to-br from-purple-500/40 via-fuchsia-500/40 to-sky-400/40 border border-purple-300/60 rounded-3xl px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.9)] backdrop-blur-2xl">
          <ProfilePurchases
            loadingPurchases={loadingPurchases}
            purchaseError={purchaseError}
            purchased={purchased}
          />
        </div>

        <div className="bg-gradient-to-br from-purple-500/40 via-fuchsia-500/40 to-sky-400/40 border border-purple-300/60 rounded-3xl px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.9)] backdrop-blur-2xl">
          <ProfileSections isAdmin={isAdmin} />
        </div>
      </motion.div>
    </main>
  );
};

export default ProfileScreen;