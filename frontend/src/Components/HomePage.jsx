import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Section component
const Section = ({ title, games = [] }) => {
  if (!games.length) return null;

  return (
    <motion.section
      className="max-w-7xl mx-auto px-6 py-16"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-10 text-center"
      >
        {title}
      </motion.h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {games.map((game, idx) => (
          <motion.div
            key={game.id || idx}
            variants={cardVariants}
            className="bg-neutral-900 rounded-2xl shadow-lg hover:shadow-yellow-500/30 hover:scale-[1.03] transition-all overflow-hidden"
          >
            <img
              src={game.imageUrl || "https://via.placeholder.com/300x150?text=No+Image"}
              alt={game.title || "Game"}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 text-white">
              <h4 className="text-xl font-semibold mb-2">{game.title}</h4>
              <p className="text-gray-400 text-sm mb-3">{game.description}</p>
              <p className="text-yellow-400 font-bold text-lg mb-3">
                ${game.price?.toFixed(2) || "N/A"}
              </p>
              <button className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition">
                Buy Now
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

function HomePage({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [featuredGames, setFeaturedGames] = useState([]);

  // Fetch from ASP.NET backend
  useEffect(() => {
    fetch("http://localhost:5148/api/featured-games")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched games:", data);
        setFeaturedGames(data || []);
      })
      .catch((err) => console.error("Failed to load games:", err)); // Error handling
  }, []);

  return (
    <div className="bg-[#121212] text-white font-sans min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <header className="bg-neutral-900/90 backdrop-blur-md shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-yellow-400">
            Bokhar Store
          </h1>
          <nav className="space-x-6 text-gray-300 font-medium">
            <button
              onClick={() => navigate("/Home")}
              className="hover:text-yellow-400 transition"
            >
              Home
            </button>
            {!isLoggedIn && (
              <button
                onClick={() => navigate("/Login")}
                className="hover:text-yellow-400 transition"
          >
                Login
              </button>
            )}
            <button className="hover:text-yellow-400 transition">Store</button>
            <button className="hover:text-yellow-400 transition">Contact</button>
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
        <div className="absolute inset-0 bg-black/70" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 max-w-xl px-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-yellow-400">
            🔥 Featured Bokhari deals
          </h2>
          <p className="text-gray-200 mb-6 text-lg">
            Discover the best digital deals from Bokhar Store. Secure. Instant. Affordable.
          </p>
          <button className="bg-yellow-400 text-black px-6 py-3 font-bold rounded-lg hover:bg-yellow-300 transition">
            Browse Store
          </button>
        </motion.div>
      </section>

      {/* Dynamic Section from backend */}
      <Section title="Featured Bokhari Deals" games={featuredGames} />

      {/* Footer */}
      <footer className="bg-neutral-900 text-gray-400 text-center py-6 mt-20">
        &copy; {new Date().getFullYear()} Bokhar Store — Created by Roham Harandifasih
      </footer>
    </div>
  );
}

export default HomePage;
