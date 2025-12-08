import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProfileSections = ({ isAdmin }) => {
  const navigate = useNavigate();

  if (!isAdmin) {
    return (
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
    );
  }

  return (
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
          <li> Total users</li>
          <li> Active sessions</li>
          <li> Top selling games</li>
        </ul>
      </div>
    </motion.section>
  );
};

export default ProfileSections;