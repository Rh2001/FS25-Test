import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [permission, setPermission] = useState(0);

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

  const isAdmin = permission === 1;

  return (
    <main className="min-h-screen bg-gray-950 text-white pt-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-2">
          {isAdmin ? "Admin Dashboard" : "User Dashboard"}
        </h1>
        <p className="text-gray-400 mb-8">
          Welcome back,{" "}
          <span className="font-semibold text-sky-300">{username}</span>.
        </p>

        {/* USER DASHBOARD */}
        {!isAdmin && (
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-2">Your Account</h2>
              <p className="text-sm text-gray-300 mb-4">
                View your profile information and recent activity.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Email and login details</li>
                <li>• Recent purchases (future feature)</li>
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
          </section>
        )}

        {/* ADMIN DASHBOARD */}
        {isAdmin && (
          <section className="grid md:grid-cols-3 gap-6">
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
          </section>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;