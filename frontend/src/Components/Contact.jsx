import React, { useState } from "react";
import { motion } from "framer-motion";
import { sectionVariants } from "./GlobalFunctions/Variants";

const API_BASE = process.env.REACT_APP_API_URL || "https://localhost:443";

const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const validate = () => {
    const next = {};
    if (!email.trim()) {
      next.email = "Email is required.";
    } else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email.trim())) {
        next.email = "Enter a valid email address.";
      }
    }
    if (!message.trim()) {
      next.message = "Message is required.";
    } else if (message.trim().length < 10) {
      next.message = "Message should be at least 10 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), message: message.trim() })
      });

      const text = await res.text().catch(() => "");
      if (!res.ok) {
        setStatus({
          type: "error",
          text: text || "Failed to send support request."
        });
      } else {
        setStatus({
          type: "success",
          text: "Your support request has been sent. We will get back to you by email."
        });
        setEmail("");
        setMessage("");
        setErrors({});
      }
    } catch {
      setStatus({
        type: "error",
        text: "An error occurred while sending your request."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050712] text-white pt-24 px-4 md:px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black/95" />
      </div>
      <div className="max-w-3xl mx-auto relative z-10 pb-16">
        <motion.section
          className="rounded-2xl md:rounded-3xl px-5 md:px-8 py-6 md:py-8 bg-slate-900/90 border border-slate-700/80 shadow-lg"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-3xl font-extrabold mb-2">Contact Support</h1>
          <p className="text-sm text-slate-300 mb-6">
            Send us your question or issue and we will respond to the email address you provide.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Your email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className="w-full rounded-lg bg-slate-950/80 px-3 py-2 text-sm border border-slate-700/80 focus:border-sky-400 focus:outline-none text-slate-100 placeholder:text-slate-400"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-rose-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setErrors((prev) => ({ ...prev, message: undefined }));
                }}
                className="w-full rounded-lg bg-slate-950/80 px-3 py-2 text-sm h-32 resize-none border border-slate-700/80 focus:border-sky-400 focus:outline-none text-slate-100 placeholder:text-slate-400"
                placeholder="Describe your issue or question…"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-rose-400">{errors.message}</p>
              )}
            </div>

            {status && (
              <div
                className={
                  status.type === "success"
                    ? "text-xs md:text-sm text-emerald-200 bg-emerald-900/40 border border-emerald-600/70 rounded-lg px-3 py-2"
                    : "text-xs md:text-sm text-rose-200 bg-rose-900/40 border border-rose-600/70 rounded-lg px-3 py-2"
                }
              >
                {status.text}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-60 disabled:cursor-not-allowed text-sm font-semibold text-white transition-colors"
              >
                {submitting ? "Sending…" : "Send message"}
              </button>
            </div>
          </form>
        </motion.section>
      </div>
    </main>
  );
};

export default ContactPage;