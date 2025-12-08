import React from "react";
import { motion } from "framer-motion";
import { sectionVariants } from "../GlobalFunctions/Variants";

const ProfileHeader = ({ isAdmin, username }) => {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
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
  );
};

export default ProfileHeader;