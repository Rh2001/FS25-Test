import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const GameLoginPrompt = ({ open, gameTitle, onCancel, onConfirm }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "tween", duration: 0.08, ease: "easeOut" }}
          >
            <div className="max-w-sm w-full bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold mb-2 text-white">
                Login required
              </h2>
              <p className="text-sm text-gray-300 mb-6">
                You need to log in to buy{" "}
                <span className="font-semibold">{gameTitle}</span>.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-sm font-semibold"
                >
                  Go to Login
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GameLoginPrompt;