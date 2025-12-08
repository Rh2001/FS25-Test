import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProfilePurchases = ({
  loadingPurchases,
  purchaseError,
  purchased,
}) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default ProfilePurchases;