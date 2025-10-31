import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

 // Hero Section Component moved here for clarity
 
function Hero() {
  const navigate = useNavigate();

  return (
    <div>
      <section
        className="relative h-[70vh] flex items-center justify-center bg-center bg-cover text-center"
        style={{
          backgroundImage:
            "url('https://cdn.cloudflare.steamstatic.com/steam/clusters/sale_dailydeal/ce98cf45b08dbed905ce57a4bd6b451b53103a9f.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e14]/40 via-[#0b0e14]/70 to-[#0b0e14]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.15),transparent_70%)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 max-w-xl px-6"
        >
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-5 text-transparent bg-clip-text 
                         bg-gradient-to-r from-sky-400 to-cyan-500 
                         drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]"
          >
            💠 Featured Bokhari Deals
          </h2>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            Explore the best digital game deals — instant, secure, and built for gamers.
          </p>
          <motion.button
            onClick={() => navigate("/store")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-sky-500 to-cyan-500 text-black px-6 py-3 
                       font-bold rounded-md hover:opacity-90 transition"
          >
            Browse Store
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

export default Hero;