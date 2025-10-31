import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { sectionVariants } from "../GlobalFunctions/Variants"; 


const GamesHolder = ({ title = "Featured", games = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Current slide index
  const [isPaused, setIsPaused] = useState(false); // To control auto-scroll pausing
  const intervalRef = useRef(null);

  // Touch/swipe tracking
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);
  let Duration = 3; // Duration of scroll, you can set it as seconds here, it will automatically turn it into milliseconds

  // Check to see if games list changed and reset index if needed
  useEffect(() => {
    if (!games || games.length === 0) {
      setCurrentIndex(0);
      return;
    }
    //Sets and ensure currentIndex is within bounds
    setCurrentIndex((c) => (c >= games.length ? 0 : c));
  }, [games]);

  // Auto-advance interval
  useEffect(() => {
    Duration = Duration * 1000; // Convert to milliseconds
    if (isPaused || (games?.length ?? 0) <= 1) return; // If paused or not enough games, do nothing

    if (intervalRef.current) { // If interval already exists, clear it
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((c) => (c + 1) % games.length);
    }, Duration); // The Duration here represents milliseconds. 

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, games]);

  const goTo = (index) => {
    if (!games || games.length === 0) return;
    setCurrentIndex(((index % games.length) + games.length) % games.length);
  };

  const handlePrev = () => goTo(currentIndex - 1);
  const handleNext = () => goTo(currentIndex + 1);

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
    touchDeltaX.current = 0;
    setIsPaused(true);
  };
  const onTouchMove = (e) => {
    if (touchStartX.current == null) return;
    const x = e.touches?.[0]?.clientX ?? 0;
    touchDeltaX.current = x - touchStartX.current;
  };
  const onTouchEnd = () => {
    const delta = touchDeltaX.current;
    const threshold = 50; // px required to count as a swipe
    if (delta > threshold) {
      handlePrev();
    } else if (delta < -threshold) {
      handleNext();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    // Small delay before resuming auto-play to avoid immediate advance and ruin the page.
    setTimeout(() => setIsPaused(false), 500);
  };

  if (!games || games.length === 0) {
    return null;
  }

  // Percentage each slide occupies of the wrapper, please touch this very carefully as it might ruin the appearance.
  const slidePercent = 100 / games.length;
  // translate value relative to wrapper width
  const translatePercent = -(currentIndex * slidePercent);

  return (
    <motion.section
      className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 relative z-10"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h3 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-500 mb-8 text-center">
        {title}
      </h3>

      <div className="relative">
        {/* Carousel viewport - hides overflow so page won't jump */}
        <div
          className="w-full overflow-hidden"
          style={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* slides wrapper - width = n * 100% (of container); translateX is relative to wrapper width */}
          <motion.div
            className="flex"
            animate={{ x: `${translatePercent}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            style={{ width: `${games.length * 100}%` }}
          >
            {games.map((game, idx) => (
              // each slide width = (100 / n)% of wrapper so it equals container width
              <div
                key={game.id ?? game._id ?? idx}
                className="flex-shrink-0 flex justify-center"
                style={{ width: `${slidePercent}%` }}
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
                      <button className="bg-white text-black font-semibold px-5 py-3 rounded-md shadow-sm hover:opacity-95 transition">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Prev / Next (optional) */}
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

        {/* Dots */}
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