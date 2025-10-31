import {motion} from "framer-motion";

<div
      className="text-white font-sans min-h-screen overflow-x-hidden relative"
      style={{
        background: "linear-gradient(120deg, #0b0e14, #111827, #0b0e14)",
        backgroundSize: "300% 300%",
        animation: "gradientMove 12s ease infinite",
      }}
    >
      {/* Animated Background*/}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-sky-500/10 blur-3xl rounded-full"
        animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full"
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />


      {/* Hero Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center bg-center bg-cover text-center"
        style={{
          backgroundImage:
            "url('https://cdn.cloudflare.steamstatic.com/steam/clusters/sale_main_capsule/00a9de168c1638d35366c19e9f0562a42386c57c.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e14]/40 via-[#0b0e14]/70 to-[#0b0e14]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.15),transparent_70%)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 max-w-xl px-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-transparent bg-clip-text 
                         bg-gradient-to-r from-sky-400 to-cyan-500 
                         drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]"
          >
            💎 Explore Our Store
          </h2>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            Browse the latest game collections with fair prices.
          </p>
        </motion.div>
      </section>
    </div>