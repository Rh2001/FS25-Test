import React from "react";
import { motion } from "framer-motion";
import { sectionVariants, containerVariants, gameCardVariants } from "../GlobalFunctions/Variants";

const ProfilePurchases = ({
  loadingPurchases,
  purchaseError,
  purchased,
}) => {
  return (
    <motion.section
      className="mb-10"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
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

      {purchased.length > 0 && (
        <motion.div
          className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {purchased.map((g, index) => (
            <motion.article
              key={g.id || index}
              variants={gameCardVariants}
              initial="false"
              whileHover={{ scale: 1.04, rotateY: 3 }}
              transition={{ type: "spring", stiffness: 0, damping: 10 }}
              className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 overflow-hidden shadow-[0_18px_45px_rgba(15,23,42,0.95)]"
            >
              {g.imageUrl && (
                <img
                  src={g.imageUrl}
                  alt={g.title}
                  className="w-full h-36 object-cover rounded-lg mb-3"
                />
              )}
              <h3 className="text-lg font-semibold text-slate-50">
                {g.title}
              </h3>
              {g.genre && (
                <p className="text-xs text-slate-400 mb-3">{g.genre}</p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sky-300 font-bold">
                  {typeof g.price === "number"
                    ? `$${g.price.toFixed(2)}`
                    : g.price}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
};

export default ProfilePurchases;