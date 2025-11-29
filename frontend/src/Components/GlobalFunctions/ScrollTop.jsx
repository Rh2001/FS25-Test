import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = ({ children, behavior = "smooth" }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior });
    }
  }, [pathname, behavior]);

  return children || null;
};

export default ScrollTop;