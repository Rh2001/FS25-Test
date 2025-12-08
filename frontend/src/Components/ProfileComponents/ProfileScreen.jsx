
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import profileBg from "../GlobalAssets/profile-bg.jpg";

import ProfileHeader from "./ProfileHeader";
import ProfilePurchases from "./ProfilePurchases";
import ProfileSections from "./ProfileSections";

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

        const url = `${API_BASE}/api/user/purchases`;
        console.log("Fetching purchases from:", url);

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          let backendMessage = "";
          try {
            const text = await res.text();
            backendMessage = text || res.statusText;
          } catch {
            backendMessage = res.statusText;
          }

          const friendly = `Error ${res.status}: ${backendMessage}`;
          console.error("GET /api/user/purchases failed:", friendly);

          setPurchaseError(friendly);
          return;
        }

        const data = await res.json();
        console.log("Purchases response:", data);
        setPurchased(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading purchases:", err);
        setPurchaseError(
          err instanceof Error
            ? err.message
            : "Unknown error while loading purchases."
        );
      } finally {
        setLoadingPurchases(false);
        setContentReady(true);
      }
    };

    load();
  }, []);

  const isAdmin = permission === 1;

  if (!contentReady) {
    return (
      <main className="relative min-h-screen bg-black text-white pt-24 px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img
            src={profileBg}
            alt="Profile Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/90" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 flex items-start justify-center">
          <div className="mt-10 text-gray-300 text-sm">
            Loading your library…
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-black text-white pt-24 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={profileBg}
          alt="Profile Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/90" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <ProfileHeader isAdmin={isAdmin} username={username} />

        <ProfilePurchases
          loadingPurchases={loadingPurchases}
          purchaseError={purchaseError}
          purchased={purchased}
        />

        <ProfileSections isAdmin={isAdmin} />
      </div>
    </main>
  );
};

export default ProfileScreen;