import React from "react";
import RegisterForm from "./RegisterForm";
import { motion } from "framer-motion";
import Space01 from "./Assets/Space01.jpg";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex"
    style ={{
        backgroundImage: `url(${Space01})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }}>
        
      <main className="flex-1 flex items-center justify-center pt-24 pb-12">
        <motion.section // Framer motion pop up effect
          className="w-full max-w-md mx-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <RegisterForm />
        </motion.section>
      </main>
    </div>
  );
}