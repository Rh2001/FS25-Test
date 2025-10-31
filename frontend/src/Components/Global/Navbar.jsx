// Todo... Maybe: Add a cross out for discounts and original prices(requires backend change)

import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
  const [openNavBar, setOpenNavBar] = useState(false);
  const toggleNav = () => setOpenNavBar(current => !current); // Toggle navbar open/close state
  const navigate = useNavigate();
  const Navlinks = [ // Allows easy addition/removal of nav links
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Store", link: "/store" },
    { id: 3, name: "Contact", link: "/contact" },
    { id: 4, name: "Login", link: "/login" }
  ];

  return (
    <div>
      <header className="fixed w-full z-50 neon-navbar">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <motion.h1  // Logo / Brand Name
            onClick={() => navigate("/")}
            initial={{ textShadow: "0 0 8px rgba(56,189,248,0.8)" }}
            animate={{ textShadow: ["0 0 8px rgba(56,189,248,0.8)","0 0 18px rgba(56,189,248,1)","0 0 8px rgba(56,189,248,0.8)"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 cursor-pointer drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] hover:drop-shadow-[0_0_18px_rgba(56,189,248,0.9)] transition-all duration-300"
          >
            Bokhar Store
          </motion.h1>


          {/* Responsive Hamburger Button - uses text color utilities so it matches site theme */}
          <button
            aria-label={openNavBar ? "Close menu" : "Open menu"}
            aria-expanded={openNavBar}
            onClick={toggleNav} // Toggle nav menu
            className="ml-3 inline-flex items-center justify-center rounded-full p-2 text-white bg-transparent hover:text-sky-400 hover:bg-white/6 focus:outline-none focus:ring-2 focus:ring-sky-400"
            title="Menu"
          >
            {openNavBar ? <IoCloseSharp className="w-4 h-4" /> : <GiHamburgerMenu className="w-4 h-4" />} {/* If navbar is open,show the cross icon, if its closed, show the hamburger button */}
          </button>
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
              {Navlinks.map((link) => ( // Map each link from Navlinks array to a NavLink component so it is rendered
                <NavLink
                  key={link.id}
                  to={link.link}
                  onClick={() => setOpenNavBar(false)}
                  className={({ isActive }) =>
                    (isActive ? "text-sky-400 font-semibold" : "text-white") + // Simple active link highlighting
                    " text-lg px-2 py-2 rounded hover:bg-white/6 transition-colors"
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;