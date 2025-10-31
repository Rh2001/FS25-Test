// Animation variants for section
export const sectionVariants = {
  hidden: { opacity: 0, y: 35},
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export const gameCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

