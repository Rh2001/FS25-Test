import React, { useRef, useEffect, useState } from "react";
import AstroManImg from "./GlobalAssets/AstroMan.png";
import SpaceBackground from "./GlobalAssets/AstroManBG.jpg";
import { motion } from "framer-motion";

export default function AstroMan() {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {});
    }
  }, [volume]);

  return (
   <div
  className="min-h-[200vh] w-full relative font-titillium bg-cover bg-top bg-no-repeat"
  style={{ backgroundImage: `url(${SpaceBackground})` }}
>
      {/* Global music player */}
      <audio
        ref={audioRef}
        src={require("./GlobalAssets/MysteriousVibe.mp3")}
        autoPlay
        loop
        controls={false}
        className="hidden"
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* AstroMan logo in a distinct circular card */}
      <div className="relative flex justify-center pt-24 z-10">
        <div className="bg-white/80 rounded-full p-4 shadow-2xl border-4 border-purple-300 flex items-center justify-center">
          <motion.img
            src={AstroManImg}
            alt="AstroMan"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-44 h-44 md:w-64 md:h-64 object-contain drop-shadow-[0_0_18px_rgba(139,92,246,0.5)]"
          />
        </div>
      </div>

      {/* Section content */}
      <section className="relative max-w-4xl mx-auto mt-8 rounded-2xl border-2 border-purple-500 overflow-hidden shadow-xl z-10 bg-[#181c27]/90">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-10 px-6">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-purple-400 mb-4 drop-shadow-lg">
              Who is AstroMan?
            </h2>
            <p className="text-white text-lg md:text-xl leading-relaxed">
              Meet AstroMan! Our cosmic entity who is hellbent on bringing you
              the best digital deals since his arrival on earth! Don't be deceived
              by this little guy, he is more insidious than he seems and his job
              is to make gaming more affordable for everyone! AstroMan hates
              expensive gaming just as much as you do, so trust him to find the
              best deals across infinity and beyond!
            </p>

            {/* Volume slider */}
            <div className="mt-8 flex items-center gap-3 justify-center">
              <label htmlFor="volume" className="text-white text-sm font-semibold">
                Volume
              </label>
              <input
                id="volume"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-36 accent-purple-400 rounded-full"
              />
              <span className="text-purple-300 font-bold text-sm">{Math.round(volume * 100)}%</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
