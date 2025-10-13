import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Game data, this should be fetched from the ASP.NET backend. For now, hardcoded.
const steamFeaturedGames = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    price: "$19.99",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
  },
  {
    id: 2,
    title: "Elden Ring",
    price: "$39.99",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
  },
  {
    id: 3,
    title: "Red Dead Redemption 2",
    price: "$29.99",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
  },
];

const eaFeaturedGames = [
  {
    id: 1,
    title: "FIFA 23",
    price: "$24.99",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1811260/header.jpg",
  },
  {
    id: 2,
    title: "The Sims 4",
    price: "$4.99",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1222670/header.jpg",
  },
];

const battleNetFeaturedGames = [
  {
    id: 1,
    title: "Call of Duty: Modern Warfare II",
    price: "$39.99",
    image:
      "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltd31831eda9199937/62abc0df5cbe472513c0ce59/Cortez_Base_Game-Bnet_Game-Card_Feature-960x540.jpg",
  },
  {
    id: 2,
    title: "Diablo IV",
    price: "$49.99",
    image:
      "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt7ee84e584fa45031/68476decee87fe2509b01798/DIA_DIV_Franchise_Sale_BNET_Shop_Banner_1600x500_LL01.png",
  },
  {
    id: 3,
    title: "World of Warcraft",
    price: "Subscription",
    image:
      "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt6a1db1b3c437a67d/68dd66e6459178c0108ada80/WoW_-_Midnight_-_Housing_Key_Art_-_Resize_Design_BnetShop_HeaderDesktop_1600x500.png",
  },
];

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

// Section component with tailwind styling
const Section = ({ title, games }) => (
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
      {games.map((game) => (
        <motion.div
          key={game.id}
          variants={cardVariants}
          className="bg-neutral-900 rounded-2xl shadow-lg hover:shadow-yellow-500/30 hover:scale-[1.03] transition-all overflow-hidden"
        >
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-5 text-white">
            <h4 className="text-xl font-semibold mb-2">{game.title}</h4>
            <p className="text-yellow-400 font-bold text-lg mb-3">
              {game.price}
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


function HomePage(isLoggedIn, setIsLoggedIn) {
  const navigate = useNavigate();
  

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

            {/* Check to see if user is logged in, if not show the login button*/}
            { !isLoggedIn &&
            <button
              onClick={() => navigate("/Login")}
              className="hover:text-yellow-400 transition"
            >
              Login
            </button>}
            <button className="hover:text-yellow-400 transition">Store</button>
            <button className="hover:text-yellow-400 transition">Contact</button>
          </nav>
        </div>
      </header>

      {/* Hero */}
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
            🔥 Steaming Hot Deals
          </h2>
          <p className="text-gray-200 mb-6 text-lg">
            Buy Steam CD Keys at unbeatable prices. Instant delivery. Secure checkout.
          </p>
          <button className="bg-yellow-400 text-black px-6 py-3 font-bold rounded-lg hover:bg-yellow-300 transition">
            Browse Store
          </button>
        </motion.div>
      </section>

      {/* Featured Sections */}
      <Section title="🔥 Featured Steam Games" games={steamFeaturedGames} />
      <Section title="🎮 EA App Deals" games={eaFeaturedGames} />
      <Section title="⚔️ Battle.net Deals" games={battleNetFeaturedGames} />

      {/* Footer */}
      <footer className="bg-neutral-900 text-gray-400 text-center py-6 mt-20">
        &copy; {new Date().getFullYear()} Bokhar Store — Created by Roham
        Harandifasih
      </footer>
    </div>
  );
}

export default HomePage;
