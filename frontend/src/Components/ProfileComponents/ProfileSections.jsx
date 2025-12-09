import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { sectionVariants, containerVariants, gameCardVariants } from "../GlobalFunctions/Variants";

const ProfileSections = ({ isAdmin }) => {
  const navigate = useNavigate();

  const Card = ({ title, description, buttonText, onClick, colorClass }) => (
    <motion.div
      variants={gameCardVariants}
      initial="false"
      whileHover={{ scale: 1.04, rotateY: 3 }}
      transition={{ type: "spring", stiffness: 5, damping: 10 }}
      className={`bg-gray-900/80 border border-gray-800 rounded-2xl p-6`}
    >
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-300 mb-4">{description}</p>
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-md ${colorClass} text-sm font-semibold`}
      >
        {buttonText}
      </button>
    </motion.div>
  );

  return (
    <motion.section
      className="mt-8"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="grid md:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {isAdmin ? (
          <>
            {/* Cards only visible by Admins */}
            <Card
              title="Manage Games"
              description="Add, edit, or remove games from the store."
              buttonText="Go to Game Management"
              colorClass="bg-sky-600 hover:bg-sky-700"
              onClick={() => {
                navigate("/admin/games");
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            />
            <Card
              title="Users"
              description="Check users and permissions."
              buttonText="Open User List"
              colorClass="bg-emerald-600 hover:bg-emerald-700"
            />
            <Card
              title="Analytics"
              description="View store stats and activity (placeholder)."
              buttonText="View Analytics"
              colorClass="bg-purple-600 hover:bg-purple-700"
            />
          </>
        ) : (
          <>
            {/* Cards only visible by Regular Users */}
            <Card
              title="Account Settings"
              description="Update your account details and password."
              buttonText="Manage Account"
              colorClass="bg-sky-600 hover:bg-sky-700"
            />
            <Card
              title="Support"
              description="Need help? Contact support or browse the help center."
              buttonText="Get Support"
              colorClass="bg-emerald-600 hover:bg-emerald-700"
            />
            <Card
              title="News & Updates"
              description="Stay up to date with the latest news and patch notes."
              buttonText="View News"
              colorClass="bg-purple-600 hover:bg-purple-700"
            />
          </>
        )}
      </motion.div>
    </motion.section>
  );
};

export default ProfileSections;
