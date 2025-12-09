import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { sectionVariants } from "../GlobalFunctions/Variants";
import AdminActionPrompt from "./AdminActionPrompt";

const API_BASE = process.env.REACT_APP_API_URL || "https://localhost:443";

const UsersManagement = () => {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [message, setMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

  const loadUsers = async (token) => {
    try {
      setLoadingUsers(true);
      setMessage("");
      const res = await fetch(`${API_BASE}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        setMessage(
          `Failed to load users: ${res.status} ${text || res.statusText || "Unknown"}`
        );
        setUsers([]);
        return;
      }

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      setMessage("Failed to load users.");
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      navigate("/login");
      return;
    }

    const checkAdminAndLoad = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setAllowed(false);
          setChecked(true);
          navigate("/login");
          return;
        }

        const me = await res.json();
        setCurrentUserId(me.id || null);

        if (me.permissionLevel !== 1) {
          setMessage("Access denied: you do not have permission to view the user list.");
          setAllowed(false);
          setChecked(true);
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
          return;
        }

        setAllowed(true);
        setChecked(true);
        await loadUsers(token);
      } catch {
        setMessage("Failed to verify permissions.");
        setAllowed(false);
        setChecked(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    checkAdminAndLoad();
  }, [navigate]);

  const requestDelete = (user) => {
    setPendingUser(user);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingUser) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setConfirmOpen(false);
      setPendingUser(null);
      navigate("/login");
      return;
    }

    setConfirmOpen(false);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/api/user/${pendingUser.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 204) {
        setMessage("User deleted.");
        await loadUsers(token);
      } else {
        const text = await res.text().catch(() => "");
        setMessage(`Delete user failed: ${res.status} ${text}`);
      }
    } catch {
      setMessage("Error deleting user.");
    } finally {
      setPendingUser(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setPendingUser(null);
  };

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

  if (!allowed) {
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
              You must be an admin to view the user list. Redirecting you back to your profile…
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
            User List
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

        <motion.section
          className="bg-gradient-to-br from-purple-500/35 via-fuchsia-500/35 to-sky-400/35 border border-purple-300/60 rounded-3xl px-5 py-5 shadow-[0_20px_60px_rgba(15,23,42,0.9)] backdrop-blur-2xl"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {loadingUsers && (
            <div className="text-sm text-gray-200">Loading users…</div>
          )}

          {!loadingUsers && message && (
            <div className="text-sm text-red-300 mb-3">{message}</div>
          )}

          {!loadingUsers && !message && users.length === 0 && (
            <div className="text-sm text-gray-200">No users found.</div>
          )}

          {!loadingUsers && users.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-slate-100">
                <thead className="border-b border-slate-600/60 text-slate-300">
                  <tr>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Permission Level</th>
                    <th className="py-2 pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-slate-700/40 last:border-0">
                      <td className="py-2 pr-4">{u.name}</td>
                      <td className="py-2 pr-4">{u.email}</td>
                      <td className="py-2 pr-4">{u.permissionLevel}</td>
                      <td className="py-2 pr-4">
                        {currentUserId && u.id !== currentUserId && (
                          <button
                            onClick={() => requestDelete(u)}
                            className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white transition-colors"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.section>
      </div>

      <AdminActionPrompt
        open={confirmOpen}
        title="Remove user?"
        message={
          pendingUser
            ? `Are you sure you want to remove "${pendingUser.name}" (${pendingUser.email})?`
            : ""
        }
        confirmLabel="Remove"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </main>
  );
};

export default UsersManagement;