import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GamePurchasePrompt from "./GamePageComponents/GamePurchasePrompt";

const API_BASE = process.env.REACT_APP_API_URL || "https://localhost:443";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [gameTitle, setGameTitle] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const gameId = searchParams.get("gameId");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const recordPurchase = async () => {
      if (!gameId || !sessionId) {
        setError("Missing payment information.");
        setProcessing(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const resGameStore = await fetch(`${API_BASE}/api/store-games/${gameId}`);
        let gameData = null;

        if (resGameStore.ok) {
          gameData = await resGameStore.json();
        } else if (resGameStore.status === 404) {
          const resGameFeatured = await fetch(`${API_BASE}/api/featured-games/${gameId}`);
          if (resGameFeatured.ok) {
            gameData = await resGameFeatured.json();
          }
        }

        if (gameData && gameData.title) {
          setGameTitle(gameData.title);
        }

        const res = await fetch(`${API_BASE}/api/user/purchases`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ gameId }),
        });

        if (!res.ok) {
          setError("Failed to record purchase.");
          setProcessing(false);
          return;
        }

        setProcessing(false);
        setShowPrompt(true);
      } catch {
        setError("Failed to finalize purchase.");
        setProcessing(false);
      }
    };

    recordPurchase();
  }, [gameId, sessionId, navigate]);

  const handleGoToProfile = () => {
    setShowPrompt(false);
    navigate("/profile");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleGoToStore = () => {
    setShowPrompt(false);
    navigate("/store");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {processing && !error && (
          <div className="text-sm text-gray-200">
            Finalizing your purchase…
          </div>
        )}
        {error && (
          <div className="text-sm text-red-400 mb-4">
            {error}
            <div className="mt-4">
              <button
                onClick={handleGoToStore}
                className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-sm"
              >
                Back to Store
              </button>
            </div>
          </div>
        )}
      </div>

      <GamePurchasePrompt
        open={showPrompt}
        gameTitle={gameTitle || "your game"}
        onGoToProfile={handleGoToProfile}
        onGoToStore={handleGoToStore}
      />
    </main>
  );
};

export default PaymentSuccess;
