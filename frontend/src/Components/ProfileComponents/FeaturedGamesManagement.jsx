/* Component dedicated to managing featured games in the admin profile section, can be re-used but preferably should only be used in the game management tab */

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminActionPrompt from "./AdminActionPrompt";
import { sectionVariants, containerVariants, gameCardVariants } from "../GlobalFunctions/Variants";

const API_BASE = process.env.REACT_APP_API_URL || "https://localhost:443"; // Same as before, either get it from the environment variable or default to localhost

const FeaturedGamesManagement = ({ authHeader, onMessage }) => { // States to manage featured games and form inputs
  const [featuredGames, setFeaturedGames] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  const loadFeaturedGames = async () => { // Asynchronous function to load featured games from the API, updates state accordingly
    try {
      const res = await fetch(`${API_BASE}/api/featured-games`);
      if (!res.ok) {
        setFeaturedGames([]); // If the response is not ok, set featured games to an empty array so that the page can still load
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
    e.preventDefault(); // Stops refreshing when submitting the form
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

    const payload = { // Payload to send to the API.
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

  const requestDelete = (game) => {
    setPendingDelete(game);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    const id = pendingDelete.id;
    onMessage("");
    setConfirmOpen(false);

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
    } finally {
      setPendingDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setPendingDelete(null);
  };

  return (
    <>
      <motion.section
        className="rounded-2xl p-6 bg-slate-950/40 border border-slate-600/60 shadow-[0_18px_50px_rgba(15,23,42,0.9)]"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-xl font-bold mb-3 text-slate-50">Add Featured Game</h2>
        <form
          onSubmit={handleAddFeatured}
          className="grid gap-3 md:grid-cols-2"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full rounded-lg bg-slate-900/80 px-3 py-2 text-sm md:col-span-2 border border-slate-700/80 focus:border-sky-400 focus:outline-none text-slate-100 placeholder:text-slate-400"
          />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price (optional, e.g. 19.99)"
            className="w-full rounded-lg bg-slate-900/80 px-3 py-2 text-sm md:col-span-2 border border-slate-700/80 focus:border-sky-400 focus:outline-none text-slate-100 placeholder:text-slate-400"
          />
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
            className="w-full rounded-lg bg-slate-900/80 px-3 py-2 text-sm md:col-span-2 border border-slate-700/80 focus:border-sky-400 focus:outline-none text-slate-100 placeholder:text-slate-400"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full rounded-lg bg-slate-900/80 px-3 py-2 text-sm md:col-span-2 h-20 resize-none border border-slate-700/80 focus:border-sky-400 focus:outline-none text-slate-100 placeholder:text-slate-400"
          />
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-sm font-semibold text-white transition-colors"
            >
              Add Featured Game
            </button>
          </div>
        </form>
      </motion.section>

      <motion.section
        className="max-w-6xl mx-auto mt-8 rounded-2xl p-6 bg-slate-950/40 border border-slate-600/60 shadow-[0_18px_50px_rgba(15,23,42,0.9)]"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-xl font-bold mb-4 text-slate-50">Existing Featured Games</h2>
        {featuredGames.length === 0 ? (
          <p className="text-sm text-slate-300">No featured games yet.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {featuredGames.map((game) => (
              <motion.article
                key={game.id}
                variants={gameCardVariants}
                initial="false"
                whileHover={{ scale: 1.04, rotateY: 3 }}
                transition={{ type: "spring", stiffness: 0, damping: 10 }}
                className="bg-slate-900/80 backdrop-blur-xl border border-slate-600/70 rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.95)] hover:border-sky-400/80 hover:shadow-[0_22px_55px_rgba(56,189,248,0.9)] transition-all duration-300 overflow-hidden group"
              >
                {game.imageUrl && (
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="p-4 text-slate-50">
                  <h3 className="text-lg font-semibold mb-1">
                    {game.title}
                  </h3>
                  <p className="text-slate-200 text-sm mb-4 line-clamp-2">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sky-300 font-semibold text-lg">
                      {typeof game.price === "number"
                        ? `$${game.price.toFixed(2)}`
                        : game.price}
                    </span>
                    <button
                      onClick={() => requestDelete(game)}
                      className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </motion.section>

      <AdminActionPrompt
        open={confirmOpen}
        title="Remove featured game?"
        message={
          pendingDelete
            ? `Are you sure you want to remove "${pendingDelete.title}" from featured games?`
            : ""
        }
        confirmLabel="Remove"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default FeaturedGamesManagement;
