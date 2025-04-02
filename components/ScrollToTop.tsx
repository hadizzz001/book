import { useEffect, useState } from "react";
import Image from "next/image";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-1 right-6 transition-opacity z-50 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-label="Scroll to top"
    >
      <img
        src="/arrow.png" 
        alt="Scroll to top"
        width={48} 
        height={48}
      />
    </button>
  );
};

export default ScrollToTop;
