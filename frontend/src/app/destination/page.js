"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Flag, Map } from "lucide-react"; // Imported icons for the tabs
// 🌟 Imported both lists from your data file
import { countryList, regionList } from "@/data/destinationData"; 
import SearchBar from "@/components/SearchBar";

// Since the data is now fixed, this helper is very clean and simple
const getFlagUrl = (isoCode) => {
  if (!isoCode) return "https://flagcdn.com/w80/un.png";
  return `https://flagcdn.com/w80/${isoCode.toLowerCase()}.png`;
};

const HeroSearch = () => {
  const [showAll, setShowAll] = useState(false);
  // 🌟 State for the active filter tab
  const [activeTab, setActiveTab] = useState("country"); 
  const initialDisplayCount = 16;
  
  // 🌟 Determine which data array to use based on the active tab
  const activeDataList = activeTab === "country" ? countryList : regionList;

  const displayedDestinations = showAll 
    ? activeDataList 
    : activeDataList.slice(0, initialDisplayCount);

  return (
    <div className="px-4">
      <section className="w-full max-w-[1400px] mx-auto px-4 py-12 md:py-16">
        
        {/* 1. HEADER & SEARCH SECTION */}
        <div className="flex flex-col items-center mb-16 space-y-8 text-center">
          
          <h1 className="text-2xl md:text-4xl font-bold hcol leading-tight">
            Planning a trip? Check our rates <br className="hidden md:block" />
            <span className="text-brand">for your destination.</span>
          </h1>

          <SearchBar/>

          {/* 🌟 New Filter Capsules 🌟 */}
          <div className="flex items-center justify-center gap-3">
            <button 
              onClick={() => {
                setActiveTab("country");
                setShowAll(false); // Reset "Show All" when switching tabs
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm md:text-base font-bold transition-all cursor-pointer ${
                activeTab === "country" 
                ? "bg-brand text-white shadow-md" 
                : "bg-gray-100 text-secondary hover:bg-gray-200"
              }`}
            >
              <Flag size={16} /> Country
            </button>
            
            <button 
              onClick={() => {
                setActiveTab("region");
                setShowAll(false); // Reset "Show All" when switching tabs
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm md:text-base font-bold transition-all cursor-pointer ${
                activeTab === "region"
                ? "bg-brand text-white shadow-md" 
                : "bg-gray-100 text-secondary hover:bg-gray-200"
              }`}
            >
              <Map size={16} /> Region
            </button>
          </div>

        </div>

        {/* 2. POPULAR DESTINATIONS GRID */}
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-2xl md:text-4xl font-bold hcol mb-2">Popular Destinations</h2>
          <p className="subheading text-gray-500">Choose a destination to see available eSIM plans for your next trip.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-300">
          {displayedDestinations.map((country) => (
            <Link 
              key={country.destinationID} 
              href={`/destination/${country.destinationID}`}
              className="flex items-center p-3 sm:p-4 rounded-full bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-md transition-all group"
            >
              {/* Flag Circle */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-gray-100 bg-gray-100">
                <img 
                  src={getFlagUrl(country.isoCode)}
                  alt={`Flag of ${country.destinationName}`}
                  className="object-cover w-full h-full"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                />
              </div>

              {/* Text Content */}
              <div className="ml-4 flex-grow overflow-hidden">
                <p className="font-medium subheading text-gray-900 truncate" title={country.destinationName}>
                  {country.destinationName}
                </p>
                <p className="desc text-sm">
                  From <span className="font-medium text-gray-900">₹299.00</span>
                </p>
              </div>

              {/* Chevron Icon */}
              <div className="text-gray-300 group-hover:text-brand transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </Link>
          ))}
          
          {/* Helper if a tab has no data */}
          {displayedDestinations.length === 0 && (
             <div className="col-span-full text-center py-10 text-gray-500">
               No destinations found for this category.
             </div>
          )}
        </div>

        {/* 3. VIEW ALL BUTTON (Toggles based on state) */}
        {activeDataList.length > initialDisplayCount && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="text-brand text-lg md:text-xl border-brand border-2 rounded-lg px-14 py-4 font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 cursor-pointer"
            >
              {showAll ? "Show Less" : `View All ${activeDataList.length} ${activeTab === 'country' ? 'Countries' : 'Regions'}`}
            </button>
          </div>
        )}

      </section>
    </div>
  );
};

export default HeroSearch;