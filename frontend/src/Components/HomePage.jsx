import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

// Animation variants for section
const sectionVariants = {
  hidden: { opacity: 0, y: 35},
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const gameCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Custom hook to fetch featured games
const useFeaturedGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const res = await fetch("https://localhost:443/api/featured-games");  // Updated to HTTPS
        const data = await res.json();
        setGames(data || []);
      } catch (error) {
        console.error("Couldn't load featured games:", error);
      }
    };

    loadGames();
  }, []);

  return games;
};

  // Custom hook to create Lenis instance
  const useCreateLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.1,
      lerp: 0.1,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy(); 
  }, []);
};
// Section component
const GamesHolder = ({ title, games = [] }) => {
  if (!games.length) return null;
  else{
  return (
    <motion.section
      className="max-w-7xl mx-auto px-6 py-20 relative z-10"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3
        initial={{ opacity: 0, y: -22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text 
                   bg-gradient-to-r from-sky-400 to-cyan-500 mb-12 text-center"
      >
        {title}
      </motion.h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
      >
        {games.map((game, idx) => (
          <motion.div
            key={game.id || idx}
            variants={gameCardVariants}
            initial="false"   // Bug fix for hovering twice issue, finally found it.
            whileHover={{ scale: 1.09, rotateY: 2 }}  // This will change the scale of the game cards.
            transition={{ type: "spring", stiffness: 0, damping: 10 }}
            className="bg-[#111827]/70 backdrop-blur-lg border border-[#2c3342] 
                       rounded-2xl shadow-lg shadow-sky-500/5 
                       hover:border-sky-500/40 hover:shadow-sky-500/20 
                       transition-all duration-300 overflow-hidden group"
          >
            <img
              src={
                game.imageUrl ||
                "this is not an image, it will not be used"
              }
              alt={game.title || "Game"}
              className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-5 text-white">
              <h4 className="text-lg font-semibold mb-1">{game.title}</h4>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {game.description}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-sky-400 font-semibold text-lg">
                  ${game.price?.toFixed(2) || "N/A"}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-sky-500 to-cyan-500 text-black 
                             font-semibold px-4 py-2 rounded-md shadow-sm 
                             hover:shadow-sky-500/30 transition"
                >
                  Buy Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}};

function HomePage({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const featuredGames = useFeaturedGames();
  useCreateLenis();

 

  return (
    <div
      className="text-white font-sans min-h-screen overflow-x-hidden relative"
      style={{
        background: "linear-gradient(120deg, #0b0e14, #111827, #0b0e14)",
        backgroundSize: "250% 250%",
        animation: "gradientMove 12s ease infinite",
      }}
    >
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-sky-500/10 blur-3xl rounded-full"
        animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full"
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Neon Glass Navbar */}
      <header className="fixed w-full z-50 neon-navbar">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <motion.h1
            onClick={() => navigate("/")}
            initial={{ textShadow: "0 0 8px rgba(56,189,248,0.8)" }}
            animate={{
              textShadow: [
                "0 0 8px rgba(56,189,248,0.8)",
                "0 0 18px rgba(56,189,248,1)",
                "0 0 8px rgba(56,189,248,0.8)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text 
                       bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 cursor-pointer 
                       drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] 
                       hover:drop-shadow-[0_0_18px_rgba(56,189,248,0.9)] 
                       transition-all duration-300"
          >
            Bokhar Store
          </motion.h1>

          <nav className="space-x-6 text-gray-300 font-medium flex items-center">
            <button
              onClick={() => navigate("/")}
              className="text-sky-400 drop-shadow-[0_0_6px_#38bdf8]"
            >
              Home
            </button>
            {!isLoggedIn && (
              <button
                onClick={() => navigate("/Login")}
                className="hover:text-sky-400 transition hover:drop-shadow-[0_0_6px_#38bdf8]"
              >
                Login
              </button>
            )}
            <button
              onClick={() => navigate("/store")}
              className="hover:text-sky-400 transition hover:drop-shadow-[0_0_6px_#38bdf8]"
            >
              Store
            </button>
            <button className="hover:text-sky-400 transition hover:drop-shadow-[0_0_6px_#38bdf8]">
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
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
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-transparent bg-clip-text 
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

      {/* Dynamic Section */}
      <GamesHolder title="Featured Bokhari Deals" games={featuredGames} />

      {/* Footer */}
      <footer className="bg-[#1a1f29]/90 border-t border-[#2b3240]/50 text-gray-400 
                         text-center py-8 mt-20 relative z-10 backdrop-blur-md"
      >
        <p>
          &copy; {new Date().getFullYear()} Bokhar Store —{" "}
          <span className="text-sky-400 font-semibold">
            Created by Roham Harandifasih
          </span>
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
