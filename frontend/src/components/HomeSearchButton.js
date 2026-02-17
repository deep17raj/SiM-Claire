"use client"; // This makes it interactive
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function HomeSearchButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button only after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToSearch = () => {
    const searchInput = document.getElementById("dest");
    if (searchInput) {
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
      searchInput.focus();
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToSearch}
      className="fixed bottom-24 right-10 z-40 bg-brand text-tertary p-4 font-bold cursor-pointer rounded-full shadow-lg shadow-orange-500/20   hover:scale-110 transition-all duration-300 group"
      aria-label="Scroll to Search"
    >
      <Search size={24} />
      {/* Tooltip */}
      <span className="absolute right-full ml-3 top-1/2 -translate-y-1/2 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Search
      </span>
    </button>
  );
}