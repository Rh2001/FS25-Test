import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminActionPrompt from "./AdminActionPrompt";
import { sectionVariants, containerVariants, gameCardVariants } from "../GlobalFunctions/Variants";

const API_BASE = process.env.REACT_APP_API_URL || "https://localhost:443";

const StoreGamesManagement = ({ authHeader, onMessage }) => {
  const [storeGames, setStoreGames] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [store, setStore] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  const loadStoreGames = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/store-games`);
      if (!res.ok) {
        setStoreGames([]);
        return;
      }
      const data = await res.json();
      setStoreGames(Array.isArray(data) ? data : []);
    } catch {
      setStoreGames([]);
    }
  };

  useEffect(() => {
    loadStoreGames();
  }, []);

  const handleAddGame = async (e) => {
    e.preventDefault();
    onMessage("");

    if (!title.trim()) {
      onMessage("Title is required.");
      return;
    }

    const priceNumber = Number(price);
    if (Number.isNaN(priceNumber)) {
      onMessage("Price must be a number.");
      return;
    }

    const payload = {
      title,
      price,
      genre,
      store,
      description: description || "",
      imageUrl: imageUrl || "",
    };

    try {
      const res = await fetch(`${API_BASE}/api/store-games`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      if (!res.ok) {
        onMessage(`Add store game failed: ${res.status} ${text}`);
        return;
      }

      onMessage("Store game added.");
      setTitle("");
      setPrice("");
      setGenre("");
      setStore("");
      setDescription("");
      setImageUrl("");

      await loadStoreGames();
    } catch (err) {
      onMessage(`Error adding store game: ${err}`);
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
      const res = await fetch(`${API_BASE}/api/store-games/${id}`, {
        method: "DELETE",
        headers: {
          ...authHeader,
        },
      });

      if (res.status === 204) {
        onMessage("Store game deleted.");
        await loadStoreGames();
      } else {
        const text = await res.text();
        onMessage(`Delete store game failed: ${res.status} ${text}`);
      }
    } catch (err) {
      onMessage(`Error deleting store game: ${err}`);
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
        <h2 className="text-xl font-bold mb-3 text-slate-50">Add Store Game</h2>
        <form onSubmit={handleAddGame} className="grid gap-3 md:grid-cols-2">
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
            placeholder="Price (e.g. 19.99)"
            className="w-full rounded-lg bg-slate-900/80 px-3 py-2 text-sm border border-slate-700/80 focus:border-sky-400 focus:outline-none text-slate-100 placeholder:text-slate-400"
          />
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Genre"
            className="w-full rounded-lg bg-slate-900/80 px-3 py-2 text-sm border border-slate-700/80 focus:border-sky-400 focus:outline-none text-slate-100 placeholder:text-slate-400"
          />
          <input
            type="text"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            placeholder="Store (e.g., Steam, Epic)"
            className="w-full rounded-lg bg-slate-900/80 px-3 py-2 text-sm border border-slate-700/80 focus:border-sky-400 focus:outline-none text-slate-100 placeholder:text-slate-400"
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
              Add Game
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
        <h2 className="text-xl font-bold mb-4 text-slate-50">Existing Store Games</h2>
        {storeGames.length === 0 ? (
          <p className="text-sm text-slate-300">No games in store yet.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {storeGames.map((game, index) => (
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
                  <p className="text-slate-300 text-xs mb-2">
                    {game.genre} {game.store && `· ${game.store}`}
                  </p>
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
        title="Remove game?"
        message={
          pendingDelete
            ? `Are you sure you want to remove "${pendingDelete.title}" from the store?`
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

export default StoreGamesManagement;
