// Todo... Maybe: Add a cross out for discounts and original prices(requires backend change)

import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import AstroMan from '../GlobalAssets/AstroMan.png';

const Navbar = () => {
  const [openNavBar, setOpenNavBar] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNav = () => setOpenNavBar(current => !current);

  // Re-read username on every route change (incl. after login redirect)
  useEffect(() => {
    const name = localStorage.getItem("username");
    setUsername(name || "");
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUsername("");
    setOpenNavBar(false);
    navigate("/");
  };

  const Navlinks = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Store", link: "/store" },
    { id: 3, name: "Contact", link: "/contact" },
    username
      ? { id: 4, name: "Profile", link: "/profile" }
      : { id: 4, name: "Login", link: "/login" },
  ];

  return (
    <div>
      <header className="fixed w-full z-50 neon-navbar">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-4">
            <motion.img
              src={AstroMan}
              alt="AstroMan Logo"
              onClick={() => navigate("/astro")}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-12 w-12 cursor-pointer drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] hover:drop-shadow-[0_0_18px_rgba(56,189,248,0.9)] transition-all duration-300"
            />
            <span
              className="text-2xl font-extrabold text-purple-400 drop-shadow-lg cursor-pointer"
              onClick={() => navigate("/")}
            >
              Bokhar Store
            </span>
          </div>

          <div className="flex items-center gap-4">
            {username && (
              <>
                <span className="hidden sm:inline text-sm font-semibold text-sky-300">
                  {username}
                </span>
                <button
                  onClick={handleLogout}
                  className="hidden sm:inline px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 text-red-300 hover:bg-gray-700 hover:text-red-200 transition"
                >
                  Logout
                </button>
              </>
            )}

            <button
              aria-label={openNavBar ? "Close menu" : "Open menu"}
              aria-expanded={openNavBar}
              onClick={toggleNav}
              className="ml-3 inline-flex items-center justify-center rounded-full p-2 text-white bg-transparent hover:text-sky-400 hover:bg-white/6 focus:outline-none focus:ring-2 focus:ring-sky-400"
              title="Menu"
            >
              {openNavBar ? (
                <IoCloseSharp className="w-4 h-4" />
              ) : (
                <GiHamburgerMenu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {openNavBar && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-72 sm:w-80 bg-gray-900 text-white z-50 shadow-xl p-6"
          >
            <button
              aria-label="Close menu"
              onClick={() => setOpenNavBar(false)}
              className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full p-1.5 text-white bg-gray-800 hover:bg-gray-800/80 focus:outline-none"
            >
              <IoCloseSharp className="w-4 h-4" />
            </button>

            <nav className="mt-8 flex flex-col gap-4">
              {Navlinks.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.link}
                  onClick={() => setOpenNavBar(false)}
                  className={({ isActive }) =>
                    (isActive ? "text-sky-400 font-semibold" : "text-white") +
                    " text-lg px-2 py-2 rounded hover:bg-white/6 transition-colors"
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {username && (
                <button
                  onClick={handleLogout}
                  className="mt-4 text-left text-red-300 text-lg px-2 py-2 rounded hover:bg-white/6 transition-colors"
                >
                  Logout
                </button>
              )}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;