/* Simple action prompt popup for when the admin wants to delete a game. Can be re-used. */

import { motion, AnimatePresence } from "framer-motion";

const AdminActionPrompt = ({ 
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}) => {
 

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
          <motion.div
            className="relative max-w-sm w-full mx-4 bg-slate-950 border border-slate-700 rounded-2xl p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "tween", duration: 0.1, ease: "easeOut" }}
          >
            <h2 className="text-xl font-bold mb-2 text-slate-50">
              {title}
            </h2>
            <p className="text-sm text-slate-300 mb-6">
              {message}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-sm text-slate-100"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-sm font-semibold text-white"
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdminActionPrompt;