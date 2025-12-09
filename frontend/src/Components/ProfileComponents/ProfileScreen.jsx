import React, { useEffect, useMemo, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import profBG01 from "../GlobalAssets/profBG01.jpg";
import profBG02 from "../GlobalAssets/profBG02.jpg";
import ProfileHeader from "./ProfileHeader";
import ProfilePurchases from "./ProfilePurchases";
import ProfileSections from "./ProfileSections";

const API_BASE = process.env.REACT_APP_API_URL || "https://localhost:443";

const ProfileBackground = memo(function ProfileBackground({ src }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <img
        src={src}
        alt="Profile Background"
        className="w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90" />
    </div>
  );
});

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
  const profileBg = useMemo(() => (isAdmin ? profBG01 : profBG02), [isAdmin]);

  if (!contentReady) {
    return (
      <main className="relative min-h-screen bg-[#050712] text-white pt-24 px-4 md:px-6 overflow-hidden">
        <ProfileBackground src={profileBg} />
        <div className="max-w-6xl mx-auto relative z-10 flex items-start justify-center">
          <div className="mt-10 text-gray-100 text-sm">
            Loading your library…
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#050712] text-white pt-24 px-4 md:px-6 overflow-hidden">
      <ProfileBackground src={profileBg} />
      <div className="max-w-6xl mx-auto relative z-10 pb-16 md:pb-20 space-y-8">
        <div className="bg-slate-900/85 border border-slate-700/80 rounded-2xl md:rounded-3xl px-4 md:px-6 py-5 md:py-6 shadow-lg">
          <ProfileHeader isAdmin={isAdmin} username={username} />
        </div>

        <div className="bg-slate-900/85 border border-slate-700/80 rounded-2xl md:rounded-3xl px-4 md:px-6 py-5 md:py-6 shadow-lg">
          <ProfilePurchases
            loadingPurchases={loadingPurchases}
            purchaseError={purchaseError}
            purchased={purchased}
          />
        </div>

        <div className="bg-slate-900/85 border border-slate-700/80 rounded-2xl md:rounded-3xl px-4 md:px-6 py-5 md:py-6 shadow-lg">
          <ProfileSections isAdmin={isAdmin} />
        </div>
      </div>
    </main>
  );
};

export default ProfileScreen;