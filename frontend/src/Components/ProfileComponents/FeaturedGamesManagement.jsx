import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_BASE = process.env.REACT_APP_API_URL || "https://localhost:443";

const FeaturedGamesManagement = ({ authHeader, onMessage }) => {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const loadFeaturedGames = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/featured-games`);
      if (!res.ok) {
        setFeaturedGames([]);
        return;
      }
      const data = await res.json();
      setFeaturedGames(Array.isArray(data) ? data : []);
    } catch {
      setFeaturedGames([]);
    }
  };

  useEffect(() => {
    loadFeaturedGames();
  }, []);

  const handleAddFeatured = async (e) => {
    e.preventDefault();
    onMessage("");

    if (!title.trim()) {
      onMessage("Featured title is required.");
      return;
    }

    const priceNumber = price ? Number(price) : 0;
    if (price && Number.isNaN(priceNumber)) {
      onMessage("Featured price must be a number.");
      return;
    }

    const payload = {
      title,
      description: description || "",
      imageUrl: imageUrl || "",
      price: priceNumber,
    };

    try {
      const res = await fetch(`${API_BASE}/api/featured-games`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      if (!res.ok) {
        onMessage(`Add featured game failed: ${res.status} ${text}`);
        return;
      }

      onMessage("Featured game added.");
      setTitle("");
      setPrice("");
      setDescription("");
      setImageUrl("");

      await loadFeaturedGames();
    } catch (err) {
      onMessage(`Error adding featured game: ${err}`);
    }
  };

  const handleDeleteFeatured = async (id) => {
    onMessage("");

    try {
      const res = await fetch(`${API_BASE}/api/featured-games/${id}`, {
        method: "DELETE",
        headers: {
          ...authHeader,
        },
      });

      if (res.status === 204) {
        onMessage("Featured game deleted.");
        await loadFeaturedGames();
      } else {
        const text = await res.text();
        onMessage(`Delete featured game failed: ${res.status} ${text}`);
      }
    } catch (err) {
      onMessage(`Error deleting featured game: ${err}`);
    }
  };

  return (
    <>
      {/* Add featured game form */}
      <motion.section
        className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 mb-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
      >
        <h2 className="text-xl font-bold mb-3">Add Featured Game</h2>
        <form
          onSubmit={handleAddFeatured}
          className="grid gap-3 md:grid-cols-2"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full rounded-md bg-gray-800 px-3 py-2 text-sm md:col-span-2"
          />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price (optional, e.g. 19.99)"
            className="w-full rounded-md bg-gray-800 px-3 py-2 text-sm md:col-span-2"
          />
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
            className="w-full rounded-md bg-gray-800 px-3 py-2 text-sm md:col-span-2"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full rounded-md bg-gray-800 px-3 py-2 text-sm md:col-span-2 h-20 resize-none"
          />
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-sm font-semibold"
            >
              Add Featured Game
            </button>
          </div>
        </form>
      </motion.section>

      {/* Featured games list */}
      <motion.section
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
      >
        <h2 className="text-xl font-bold mb-4">Existing Featured Games</h2>
        {featuredGames.length === 0 ? (
          <p className="text-sm text-gray-400">No featured games yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredGames.map((game, index) => (
              <motion.article
                key={game.id}
                className="bg-[#111827]/70 backdrop-blur-lg border border-[#2c3342]
                           rounded-2xl shadow-lg shadow-sky-500/5
                           hover:border-sky-500/40 hover:shadow-sky-500/20
                           transition-all duration-300 overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: index * 0.03,
                }}
              >
                {game.imageUrl && (
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="p-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">
                    {game.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sky-400 font-semibold text-lg">
                      {typeof game.price === "number"
                        ? `$${game.price.toFixed(2)}`
                        : game.price}
                    </span>
                    <button
                      onClick={() => handleDeleteFeatured(game.id)}
                      className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-xs font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </motion.section>
    </>
  );
};

export default FeaturedGamesManagement;