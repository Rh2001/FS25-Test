// The following code implements a carousel component for displaying featured games on the homepage. It includes auto-scrolling functionality, touch/swipe support, and navigation controls.
// The upper half is the logic behind the scroll while the lower half is the rendering code. As the code is long, the comments only cover the scrolling logic parts and not the rendering code.
// By Roham Harandifasih

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { sectionVariants } from "../GlobalFunctions/Variants"; 
import { useNavigate } from "react-router-dom";

const GamesHolder = ({ title = "Featured", games = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Current slide index
  const [isPaused, setIsPaused] = useState(false); // To control auto-scroll pausing
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  // Touch/swipe tracking for mobile devices(You will not see this in action but its good to have here for future proofing)
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  // Autoplay interval in milliseconds (change this to adjust timing of auto-scroll, make sure its in milliseconds or it will be doomed(speaking of experience))
  const Duration = 3000;

  // Ensure index stays valid when games change
  useEffect(() => {
    if (!games || games.length === 0) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex((c) => (c >= games.length ? 0 : c));
  }, [games]);

  // Auto-advance using a single-shot timeout for consistent timing
  useEffect(() => {
    // Clear any existing timeout to ensure consistent timing
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isPaused || (games?.length ?? 0) <= 1) return; // Don't auto-advance if paused or not enough games to display(the latter shouldn't happen under normal circumstances)

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((value) => (value + 1) % games.length); // Increment the index and use modulo to wrap around to the beginning when the end is reached
    }, Duration);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [currentIndex, isPaused, games]);

  const goTo = (index) => { // Navigate to a specific game slide index
    if (!games || games.length === 0) return;
    setCurrentIndex(((index % games.length) + games.length) % games.length);
  };

  const handlePrev = () => goTo(currentIndex - 1);  // Goes to the previous game in the list
  const handleNext = () => goTo(currentIndex + 1);  // Goes to the next game in the list

  // Touch Handlers for swipe support.
  const onTouchStart = (e) => {
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
    touchDeltaX.current = 0;
    setIsPaused(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  const onTouchMove = (e) => {
    if (touchStartX.current == null) return;
    const x = e.touches?.[0]?.clientX ?? 0;
    touchDeltaX.current = x - touchStartX.current;
  };
  const onTouchEnd = () => {
    const delta = touchDeltaX.current;
    const threshold = 50; 
    if (delta > threshold) {
      handlePrev();
    } else if (delta < -threshold) {
      handleNext();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    // Resume autoplay after short delay to avoid immediate advance
    setTimeout(() => setIsPaused(false), 600); // You can modify the delay as needed here, it is in milliseconds
  };

// Javascript rendering code for the component
  return (
    <motion.section
      className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 relative z-10"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsPaused(true)} // Pause auto-scroll on mouse hover 
      onMouseLeave={() => setIsPaused(false)} // Resume auto-scroll when mouse leaves
    >
      <h3 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-500 mb-8 text-center">
        {title}
      </h3>

      <div className="relative">
        <div
          className="w-full overflow-hidden"
          style={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * (100 / games.length)}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            style={{ width: `${games.length * 100}%` }}
          >
            {games.map((game, idx) => (
              <div
                key={game.id ?? game._id ?? idx}
                className="flex-shrink-0 flex justify-center"
                style={{ width: `${100 / games.length}%` }}
                aria-hidden={idx !== currentIndex}
              >
                <article
                  className="rounded-2xl overflow-hidden shadow-xl bg-[#0f1720]/70 border border-[#2c3342] w-full max-w-4xl"
                  style={{ minHeight: "360px" }}
                >
                  <div className="relative w-full h-72 md:h-[28rem] lg:h-[34rem] overflow-hidden">
                    <img
                      src={game.imageUrl || game.image || "/placeholder.png"}
                      alt={game.title || game.name || "Game"}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="p-6 md:p-8 text-white">
                    <h4 className="text-2xl md:text-3xl font-semibold mb-3">{game.title || game.name}</h4>
                    <p className="text-gray-400 text-sm md:text-base mb-4 line-clamp-4">
                      {game.description || game.summary || "No description available."}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sky-400 font-bold text-xl md:text-2xl">
                          {typeof game.price === "number" ? `$${game.price.toFixed(2)}` : `$${game.price ?? "N/A"}`}
                        </p>
                        {game.platform && <p className="text-xs text-gray-400 mt-1">{game.platform}</p>}
                      </div>
                      <motion.button
                        whileTap={{ scale: 1.55 }}
                        transition={{ type: "spring", stiffness: 100, damping: 55 }}
                        className="bg-white text-black font-semibold px-5 py-3 rounded-md shadow-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-sky-400 hover:to-cyan-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-sky-400"
                       // onClick={() => window.location.href = `/store/game/${game.id || game._id || ""}`} // Redirect to the game's page full reload.
                        onClick={() => navigate(`/store/game/${game.id || game._id || ""}`)} // Redirect to the game's page without full reload.
                      >
                              Buy Now
                      </motion.button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </motion.div>
        </div>

        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center w-9 h-9 rounded-full bg-white/6 text-white hover:bg-white/10 focus:outline-none"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center w-9 h-9 rounded-full bg-white/6 text-white hover:bg-white/10 focus:outline-none"
          aria-label="Next"
        >
          ›
        </button>

        <div className="flex items-center justify-center gap-2 mt-6">
          {games.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-3 h-3 rounded-full transition ${i === currentIndex ? "bg-sky-400" : "bg-white/30"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default GamesHolder;
