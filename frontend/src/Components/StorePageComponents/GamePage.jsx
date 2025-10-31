import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const base = process.env.REACT_APP_API_BASE || ""; // or use proxy
    const fetchUrl = `${base}/api/store-games/${id}`; // adjust endpoint to match your backend
    let mounted = true;
    setLoading(true);
    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => mounted && setGame(data))
      .catch((err) => mounted && setError(err.message || "Failed to load"))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-400">Error: {error}</div>;
  if (!game) return <div className="text-center py-20">Game not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="mb-6 text-sm text-white/80 hover:text-sky-400">
        ← Back
      </button>

      <div className="bg-[#0b1117] rounded-2xl overflow-hidden shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={game.imageUrl || game.image || "/placeholder.png"}
              alt={game.title || game.name}
              className="w-full h-80 md:h-full object-cover"
            />
          </div>

          <div className="p-6 md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{game.title || game.name}</h1>
            <p className="text-sky-400 text-xl font-semibold mb-4">
              {typeof game.price === "number" ? `$${game.price.toFixed(2)}` : `$${game.price ?? "N/A"}`}
            </p>
            <p className="text-gray-300 mb-6">{game.description || game.summary || "No description available."}</p>

            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/checkout/${id}`)}
                className="px-5 py-3 bg-gradient-to-r from-sky-400 to-cyan-400 text-black font-semibold rounded-md hover:scale-102 transition transform"
              >
                Buy Now
              </button>

              <button
                onClick={() => navigate("/store")}
                className="px-4 py-3 border border-white/10 text-white rounded-md hover:text-sky-400 transition"
              >
                Back to Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}