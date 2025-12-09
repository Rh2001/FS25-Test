import React, { useEffect, useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import AdminActionPrompt from "./AdminActionPrompt";
import { sectionVariants } from "../GlobalFunctions/Variants";

const API_BASE = process.env.REACT_APP_API_URL || "https://localhost:443";

const FeaturedGamesGrid = memo(function FeaturedGamesGrid({ featuredGames, onDelete }) {
  return (
    <section className="max-w-6xl mx-auto mt-8 rounded-2xl p-5 md:p-6 bg-slate-900/90 border border-slate-700/80 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-slate-50">Existing Featured Games</h2>
      {featuredGames.length === 0 ? (
        <p className="text-sm text-slate-300">No featured games yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {featuredGames.map((game) => (
            <motion.article
              key={game.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 140, damping: 16 }}
              style={{ willChange: "transform" }}
              className="bg-slate-950/90 border border-slate-700/80 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden group"
            >
              {game.imageUrl && (
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-400"
                />
              )}
              <div className="p-4 text-slate-50">
                <h3 className="text-base md:text-lg font-semibold mb-1">
                  {game.title}
                </h3>
                <p className="text-slate-200 text-xs md:text-sm mb-4 line-clamp-2">
                  {game.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sky-300 font-semibold text-sm md:text-lg">
                    {typeof game.price === "number"
                      ? `$${game.price.toFixed(2)}`
                      : game.price}
                  </span>
                  <button
                    onClick={() => onDelete(game)}
                    className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
});

const FeaturedGamesManagement = ({ authHeader, onMessage }) => {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [errors, setErrors] = useState({});

  const loadFeaturedGames = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    loadFeaturedGames();
  }, [loadFeaturedGames]);

  const handleAddFeatured = async (e) => {
    e.preventDefault();
    onMessage("");
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required.";
    if (!price.trim()) newErrors.price = "Price is required.";
    if (!imageUrl.trim()) newErrors.imageUrl = "Image URL is required.";
    if (!description.trim()) newErrors.description = "Description is required.";

    const priceNumber = Number(price);
    if (!Number.isFinite(priceNumber)) {
      newErrors.price = "Price must be a valid number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      title,
      description,
      imageUrl,
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
      setErrors({});

      await loadFeaturedGames();
    } catch (err) {
      onMessage(`Error adding featured game: ${err}`);
    }
  };

  const requestDelete = useCallback((game) => {
    setPendingDelete(game);
    setConfirmOpen(true);
  }, []);

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
        className="max-w-6xl mx-auto rounded-2xl p-5 md:p-6 bg-slate-900/90 border border-slate-700/80 shadow-lg"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-xl font-bold mb-3 text-slate-50">Add Featured Game</h2>
        <form
          onSubmit={handleAddFeatured}
          className="grid gap-3 md:grid-cols-2"
        >
          <div className="md:col-span-2">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              placeholder="Title"
              className="w-full rounded-lg bg-slate-950/80 px-3 py-2 text-sm border border-slate-700/80 focus:border-sky-400 focus:outline-none text-slate-100 placeholder:text-slate-400"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-rose-400">{errors.title}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <input
              type="text"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setErrors((prev) => ({ ...prev, price: undefined }));
              }}
              placeholder="Price (e.g. 19.99)"
              className="w-full rounded-lg bg-slate-950/80 px-3 py-2 text-sm border border-slate-700/80 focus:border-sky-400 focus:outline-none text-slate-100 placeholder:text-slate-400"
            />
            {errors.price && (
              <p className="mt-1 text-xs text-rose-400">{errors.price}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setErrors((prev) => ({ ...prev, imageUrl: undefined }));
              }}
              placeholder="Image URL"
              className="w-full rounded-lg bg-slate-950/80 px-3 py-2 text-sm border border-slate-700/80 focus:border-sky-400 focus:outline-none text-slate-100 placeholder:text-slate-400"
            />
            {errors.imageUrl && (
              <p className="mt-1 text-xs text-rose-400">{errors.imageUrl}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors((prev) => ({ ...prev, description: undefined }));
              }}
              placeholder="Description"
              className="w-full rounded-lg bg-slate-950/80 px-3 py-2 text-sm h-20 resize-none border border-slate-700/80 focus:border-sky-400 focus:outline-none text-slate-100 placeholder:text-slate-400"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.description}
              </p>
            )}
          </div>

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

      <FeaturedGamesGrid featuredGames={featuredGames} onDelete={requestDelete} />

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