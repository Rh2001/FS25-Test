import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import {motion, AnimatePresence} from 'framer-motion';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const toggleNav = () => {
    setOpenNav(true);
  }
    const navigate = useNavigate();
    const Navlinks = [
        {id:1,name:"Home",link:"/"},
        {id:2,name:"Store",link:"/store"},
        {id:3,name:"Contact",link:"/contact"},
        {id:4,name:"Login",link:"/login"}
    ]
  return (
    <div>
        {/* Floating Neon Glass Navbar */}
      <header className="fixed w-full z-50 neon-navbar">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <motion.h1
            onClick={() => navigate("/")}
            initial={{ textShadow: "0 0 8px rgba(56,189,248,0.8)" }}
            animate={{
              textShadow: [
                "0 0 8px rgba(56,189,248,0.8)",
                "0 0 18px rgba(56,189,248,1)",
                "0 0 8px rgba(56,189,248,0.8)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text 
                       bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 cursor-pointer 
                       drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] 
                       hover:drop-shadow-[0_0_18px_rgba(56,189,248,0.9)] 
                       transition-all duration-300"
          >
           Bokhar Store
           <building/>
          </motion.h1>

          <nav className="space-x-6 text-gray-300 font-medium flex items-center ">
           {Navlinks.map((link)=>(
             <button
             key={link.id}
              onClick={() => navigate(`${link.link}`)}
              className="text-sky-400 drop-shadow-[0_0_6px_#38bdf8]"
            >
              {link.name}
            </button>
           ))}
            
           
          </nav>
         <button onClick={toggleNav}><GiHamburgerMenu color='white' size={24}/></button>
        </div>
      </header>
<AnimatePresence>
 
      {openNav&&(
        <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{duration:0.3, ease:"easeInOut"}} className='fixed inset-0 gap-4 z-50 text-4xl bg-white flex flex-col w-full h-screen justify-center items-center'>
        
{Navlinks.map((link)=>(
  <a key={link.id} href={link.link} >{link.name}</a>
))}
        </motion.div>
      )}
    
   
      </AnimatePresence>
      
    </div>
  )
    
 
}

export default Navbar