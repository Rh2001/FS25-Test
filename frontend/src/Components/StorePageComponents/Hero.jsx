import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";

function Hero() {
  const navigate = useNavigate();

  const opts = {
    width: "640",
    height: "320",
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      loop: 1,
      playlist: "wx2Irm3ZFz8",
    },
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center bg-center bg-cover text-center"
        style={{
          backgroundImage:
            "url('https://www.rpnation.com/gallery/steam-background-image.27232/full')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e14]/40 via-[#0b0e14]/70 to-[#0b0e14]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.15),transparent_70%)]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 max-w-xl px-6 py-16 mt-16" // <-- Added mt-16 here
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
       

          {/* YouTube Video just below the button */}
          <div className="mt-6 w-full flex justify-center">
            <YouTube videoId="wx2Irm3ZFz8" opts={opts} />
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Hero;
