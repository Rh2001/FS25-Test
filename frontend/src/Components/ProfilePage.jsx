import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import profileBg from "./GlobalAssets/profile-bg.jpg"; 

const API_BASE = process.env.REACT_APP_API_URL || "https://localhost:443";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [permission, setPermission] = useState(0);

  const [purchased, setPurchased] = useState([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [purchaseError, setPurchaseError] = useState("");
  const [contentReady, setContentReady] = useState(false); // Controls the rest of page

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load purchases");
        }

        const data = await res.json();
        setPurchased(Array.isArray(data) ? data : []);
      } catch {
        setPurchaseError("Could not load purchased games.");
      } finally {
        setLoadingPurchases(false);
        setContentReady(true); 
      }
    };

    load();
  }, []);

  const isAdmin = permission === 1;

  // While games are loading, show only a centered loader (with background)
  if (!contentReady) {
    return (
      <main className="relative min-h-screen bg-black text-white pt-24 px-6 overflow-hidden">
        {/* Background image */}
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

  // Once contentReady is true, show full animated layout
  return (
    <main className="relative min-h-screen bg-black text-white pt-24 px-6 overflow-hidden">
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={profileBg}
          alt="Profile Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/90" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-3xl font-extrabold mb-2">
            {isAdmin ? "Admin Dashboard" : "User Dashboard"}
          </h1>
          <p className="text-gray-300">
            Welcome back,{" "}
            <span className="font-semibold text-sky-300">{username}</span>.
          </p>
        </motion.div>

        {/* Purchased games section */}
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-xl font-bold mb-3">Your Purchases</h2>

          {loadingPurchases && (
            <div className="text-sm text-gray-300">Loading your games…</div>
          )}

          {purchaseError && (
            <div className="text-sm text-red-400">{purchaseError}</div>
          )}

          {!loadingPurchases &&
            !purchaseError &&
            purchased.length === 0 && (
              <div className="text-sm text-gray-300">
                You don’t have any purchases yet.
              </div>
            )}

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {purchased.map((g, index) => (
              <motion.article
                key={g.id || index}
                className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
              >
                {g.imageUrl && (
                  <img
                    src={g.imageUrl}
                    alt={g.title}
                    className="w-full h-36 object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold">{g.title}</h3>
                {g.genre && (
                  <p className="text-xs text-gray-400 mb-3">{g.genre}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sky-400 font-bold">
                    {typeof g.price === "number"
                      ? `$${g.price.toFixed(2)}`
                      : g.price}
                  </span>
                  <button
                    className="text-sm px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700"
                    onClick={() => navigate(`/store/${g.id}`)}
                  >
                    View
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* User dashboard blocks */}
        {!isAdmin && (
          <motion.section
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-2">Your Account</h2>
              <p className="text-sm text-gray-300 mb-4">
                View your profile information and recent activity.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Email and login details</li>
                <li>• Recent purchases (see above)</li>
                <li>• Saved games or wishlist (future feature)</li>
              </ul>
            </div>

            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-2">Support</h2>
              <p className="text-sm text-gray-300 mb-4">
                Need help with your account or purchases?
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-sm font-semibold"
              >
                Contact Support
              </button>
            </div>
          </motion.section>
        )}

        {/* Admin dashboard blocks */}
        {isAdmin && (
          <motion.section
            className="grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-2">Manage Games</h2>
              <p className="text-sm text-gray-300 mb-4">
                Add, edit, or remove games from the store catalogue.
              </p>
              <button className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-sm font-semibold">
                Go to Game Management
              </button>
            </div>

            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-2">Users</h2>
              <p className="text-sm text-gray-300 mb-4">
                View and manage registered users and permissions.
              </p>
              <button className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-sm font-semibold">
                Open User List
              </button>
            </div>

            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-2">Analytics</h2>
              <p className="text-sm text-gray-300 mb-4">
                See store performance and recent activity (placeholder).
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Total users</li>
                <li>• Active sessions</li>
                <li>• Top selling games</li>
              </ul>
            </div>
          </motion.section>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;