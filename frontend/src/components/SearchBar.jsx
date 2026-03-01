"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { allDestinations } from "@/data/destinationData"; // Adjust path if needed

// --- Helper to get Flag URL ---
const getFlagUrl = (isoCode) => {
  if (!isoCode) return "https://flagcdn.com/w80/un.png";
  return `https://flagcdn.com/w80/${isoCode.toLowerCase()}.png`;
};

export default function SearchBar() {
  const router = useRouter();
  
  // Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Ref for closing the dropdown when clicking outside
  const searchContainerRef = useRef(null);

  // Handle User Typing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 0) {
      // Filter the destinations array by name (case-insensitive)
      const filtered = allDestinations.filter((dest) =>
        dest.destinationName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDestinations(filtered);
      setIsDropdownOpen(true);
    } else {
      setFilteredDestinations([]);
      setIsDropdownOpen(false);
    }
  };

  // Handle Option Click
  const handleSelectDestination = (destinationID) => {
    setIsDropdownOpen(false);
    setSearchTerm(""); // Clear search bar after selection
    router.push(`/destination/${destinationID}`);
  };

  // Handle Clicking Outside the Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto z-50" ref={searchContainerRef}>
      <input
        id="dest"
        name="dest"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search destination"
        autoComplete="off"
        className="w-full bg-white pl-12 pr-6 py-4 border-1 border-brand shadow-[0_0_25px_rgba(236,91,19,0.25)] rounded-full text-black text-lg outline-none placeholder-gray-500 transition-all"
      />

      {/* Search Icon */}
      <div className="absolute left-5 top-[28px] -translate-y-1/2 pointer-events-none text-brand">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="24"
          height="24"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      {/* SEARCH DROPDOWN MENU */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden max-h-72 overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {filteredDestinations.length > 0 ? (
            <ul className="py-2">
              {filteredDestinations.map((dest) => (
                <li 
                  key={dest.destinationID}
                  onClick={() => handleSelectDestination(dest.destinationID)}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                    <img 
                      src={getFlagUrl(dest.isoCode)} 
                      alt={`${dest.destinationName} flag`} 
                      className="object-cover w-full h-full"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                    />
                  </div>
                  <span className="font-medium text-gray-800 text-lg">
                    {dest.destinationName}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No destinations found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}