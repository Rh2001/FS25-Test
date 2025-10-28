import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
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

// Custom hook to fetch store games
const useStoreGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const res = await fetch("http://localhost:5148/api/featured-games");    // This is not the correct endpoint for store games, replace later.
        const data = await res.json();
        setGames(data || []);
      } catch (error) {
        console.error("Couldn't load store games:", error);
      }
    };

    loadGames();
  }, []);}

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
const Section = ({ title, games = [] }) => {
  if (!games.length) return null;

  return (
    <motion.section
      className="max-w-7xl mx-auto px-6 py-20 relative z-10"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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
            key={idx}
            variants={gameCardVariants}
            initial = "false"   // Bug fix for hovering twice issue, finally found it x 2, first time was in homepage :D.
            whileHover={{ scale: 1.04, rotateY: 3 }}
            transition={{ type: "spring", stiffness: 0, damping: 10 }}
            className="bg-[#111827]/70 backdrop-blur-lg border border-[#2c3342] 
                       rounded-2xl shadow-lg shadow-sky-500/5 
                       hover:border-sky-500/40 hover:shadow-sky-500/20 
                       transition-all duration-300 overflow-hidden group"
          >
            <img
              src={game.imageUrl}
              alt={game.title}
              className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-5 text-white">
              <h4 className="text-lg font-semibold mb-1">{game.title}</h4>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {game.description}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-sky-400 font-semibold text-lg">
                  ${game.price.toFixed(2)}
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
};

function StorePage({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [games] = useState([
    {
      title: "Cyberpunk 2077",
      description: "A futuristic open-world RPG set in Night City.",
      price: 59.99,
      imageUrl:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg?t=1729527383",
    },
    {
      title: "Elden Ring",
      description: "An epic adventure in a dark fantasy world by FromSoftware.",
      price: 69.99,
      imageUrl:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg?t=1729590821",
    },
    {
      title: "Assassin's Creed Mirage",
      description: "Return to stealth and parkour in historic Baghdad.",
      price: 49.99,
      imageUrl:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3035570/header.jpg?t=1753294133",
    },
    {
      title: "Baldur’s Gate 3",
      description:
        "Gather your party and experience D&D-inspired turn-based RPG gameplay.",
      price: 59.99,
      imageUrl:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg?t=1729714592",
    },
    {
      title: "Call of Duty: Modern Warfare III",
      description: "Modern combat redefined — high stakes and cinematic action.",
      price: 39.99,
      imageUrl:
        "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltd6fa384b60ff3fbd/64cc2fe367e57a3aa2cec653/Jupiter_Coming_Soon-Bnet_Game-Content_UI_(Phoenix)-EN-1920x1080_textless.jpg",
    },
  ]);

  const storeGames = useStoreGames();
  useCreateLenis();

  

  return (
    <div
      className="text-white font-sans min-h-screen overflow-x-hidden relative"
      style={{
        background: "linear-gradient(120deg, #0b0e14, #111827, #0b0e14)",
        backgroundSize: "300% 300%",
        animation: "gradientMove 12s ease infinite",
      }}
    >
      {/* Animated Background*/}
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

      {/* Navbar */}
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
              className="hover:text-sky-400 transition hover:drop-shadow-[0_0_6px_#38bdf8]"
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
              onClick={() => navigate("/Store")}
              className="text-sky-400 drop-shadow-[0_0_6px_#38bdf8]"
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
        className="relative h-[60vh] flex items-center justify-center bg-center bg-cover text-center"
        style={{
          backgroundImage:
            "url('https://cdn.cloudflare.steamstatic.com/steam/clusters/sale_main_capsule/00a9de168c1638d35366c19e9f0562a42386c57c.jpg')",
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
            💎 Explore Our Store
          </h2>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            Browse the latest game collections with fair prices.
          </p>
        </motion.div>
      </section>

      {/* Game Grid */}
      <Section title="Available Games" games={games} />

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

export default StorePage;
