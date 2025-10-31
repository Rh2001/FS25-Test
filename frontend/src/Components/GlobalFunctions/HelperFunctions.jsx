
import { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

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

export const useStoreGames = () => { // Maybe i combine two custom hooks together later on.
  const [games, setGames] = useState([]);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const res = await fetch("https://localhost:443/api/store-games");  //NOT AN ACTUAL ENDPOINT, REPLACE ONCE BACKEND IS DONE
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
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
export { useFeaturedGames, useCreateLenis };