import React from "react";
import LoginForm from "./LoginForm";
import { motion } from "framer-motion";
import Spaceman01 from "./Assets/Spaceman01.jpg";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0e14]"
    style ={{
            backgroundImage: `url(${Spaceman01})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
      <motion.div
        className="bg-[#1b1f29]/90 border border-[#2c3342] rounded-2xl shadow-xl p-8 w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <LoginForm />
      </motion.div>
    </div>
  );
}