import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProfileSections = ({ isAdmin }) => {
  const navigate = useNavigate();

  if (!isAdmin) {
    return (
      <motion.section
        className="grid md:grid-cols-3 gap-6 mt-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-2">Account Settings</h2>
          <p className="text-sm text-gray-300 mb-4">
            Update your account details, password, and security options.
          </p>
          <button className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-sm font-semibold">
            Manage Account
          </button>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-2">Support</h2>
          <p className="text-sm text-gray-300 mb-4">
            Need help? Contact support or browse the help center.
          </p>
          <button className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-sm font-semibold">
            Get Support
          </button>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-2">News & Updates</h2>
          <p className="text-sm text-gray-300 mb-4">
            Stay up to date with the latest news and patch notes.
          </p>
          <button className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-sm font-semibold">
            View News
          </button>
        </div>
      </motion.section>
    );
  }

  // Admin view panel
  return (
    <motion.section
      className="grid md:grid-cols-3 gap-6 mt-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Game Management, only admins should see this(hopefully) */}
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-2">Manage Games</h2>
        <p className="text-sm text-gray-300 mb-4">
          Add, edit, or remove games from the store catalogue.
        </p>
        <button
          className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-sm font-semibold"
          onClick={() => {
            navigate("/admin/games");
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
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
          <li>Total users</li>
          <li>Active sessions</li>
          <li>Top selling games</li>
        </ul>
      </div>
    </motion.section>
  );
};

export default ProfileSections;