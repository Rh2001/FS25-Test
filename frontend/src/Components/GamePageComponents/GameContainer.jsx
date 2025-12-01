import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameLoginPrompt from "./GameLoginPrompt";

const API_BASE = process.env.REACT_APP_API_URL || "https://localhost:443"; // Either use env variable or default to localhost if none is found

const GamePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/store-games/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Game not found.");
          } else {
            setError("Failed to load game.");
          }
          setLoading(false);
          return;
        }
        const data = await res.json();
        setGame(data);
      } catch {
        setError("Failed to load game.");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginPrompt(true);
      return;
    }

    if (!game) return;

    const gameId = game.id || game._id || id;
    if (!gameId) return;

    try {
      const res = await fetch(`${API_BASE}/api/user/purchases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gameId }),
      });

      if (!res.ok) {
        console.error("Failed to record purchase");
        return;
      }

      // on success: go to profile (library)
      navigate("/profile");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoToLogin = () => {
    setShowLoginPrompt(false);
    navigate("/login");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-white">Loading game…</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-400">
        {error}
        <div className="mt-4">
          <button
            onClick={() => {
              navigate("/store");
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-sm"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  if (!game) return null;

  return (
    <main className="relative min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Background image / gradient */}
      <div className="pointer-events-none absolute inset-0">
        {game.imageUrl && (
          <img
            src={game.imageUrl}
            alt={game.title}
            className="w-full h-full object-cover opacity-40 blur-sm scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 p-6 pt-20">
        <button
          onClick={() => {
            navigate(-1);
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="mt-4 mb-4 px-3 py-1 rounded-md bg-gray-800/80 hover:bg-gray-700 text-sm"
        >
          ← Back
        </button>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 bg-gray-900/85 rounded-2xl p-6 shadow-2xl border border-white/5 backdrop-blur-md">
          <img
            src={game.imageUrl}
            alt={game.title}
            className="w-full h-72 object-cover rounded-xl shadow-lg"
          />

          <div>
            <h1 className="text-3xl font-extrabold mb-2">{game.title}</h1>
            <p className="text-sm text-gray-300 mb-1">{game.genre}</p>
            {game.platform && (
              <p className="text-xs text-gray-400 mb-4">
                Platform: {game.platform}
              </p>
            )}
            <p className="text-gray-200 mb-6">{game.description}</p>

            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold text-sky-400">
                {typeof game.price === "number"
                  ? `$${game.price.toFixed(2)}`
                  : game.price}
              </span>
              {game.store && (
                <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-200">
                  {game.store}
                </span>
              )}
            </div>

            <button
              className="w-full py-3 rounded-md bg-purple-600 hover:bg-purple-700 font-semibold"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Login prompt component */}
      <GameLoginPrompt
        open={showLoginPrompt}
        gameTitle={game.title}
        onCancel={() => setShowLoginPrompt(false)}
        onConfirm={handleGoToLogin}
      />
    </main>
  );
};

export default GamePage;