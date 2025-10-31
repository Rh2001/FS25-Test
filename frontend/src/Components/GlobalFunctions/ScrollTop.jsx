// This is a hotfix to scroll to top on route change

import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop({ behavior = "auto" }) {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname, behavior]);

  return null;
}

export default ScrollToTop;