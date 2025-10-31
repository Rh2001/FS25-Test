import React from "react";
import { motion } from "framer-motion";
import {sectionVariants} from "./Variants";
import {containerVariants} from "./Variants";
import {gameCardVariants} from "./Variants";

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
};
}

export default GamesHolder;

