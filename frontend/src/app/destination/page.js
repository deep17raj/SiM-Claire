"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { allDestinations } from "@/data/destinationData";
// I have manually corrected the 'isoCode' for EVERY item so flags will show up!


// Since the data is now fixed, this helper is very clean and simple
const getFlagUrl = (isoCode) => {
  if (!isoCode) return "https://flagcdn.com/w80/un.png";
  return `https://flagcdn.com/w80/${isoCode.toLowerCase()}.png`;
};

const HeroSearch = () => {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 16;
  
  const displayedDestinations = showAll 
    ? allDestinations 
    : allDestinations.slice(0, initialDisplayCount);

  return (
    <div className="px-4">
      <section className="w-full max-w-[1400px] mx-auto px-4 py-12 md:py-16">
        
        {/* 1. HEADER & SEARCH SECTION */}
        <div className="flex flex-col items-center mb-16 space-y-8 text-center">
          
          <h1 className="text-2xl md:text-4xl font-bold hcol leading-tight">
            Planning a trip? Check our rates <br className="hidden md:block" />
            <span className="text-brand">for your destination.</span>
          </h1>

          {/* Search Bar Container */}
          <div className="w-full max-w-2xl relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <svg className="text-brand w-6 h-6 group-focus-within:text-brand transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input 
              type="text"
              className="w-full pl-14 pr-6 py-4 bg-white border-1 border-brand rounded-full shadow-brand/30 shadow-[0_0_25px_rgba(236,91,19,0.25)] outline-none text-lg transition-all placeholder:text-gray-400" 
              placeholder="Search for a country or region..." 
            />
          </div>

          {/* Tabs */}
          {/* <div className="flex bg-gray-100 gap-2 p-1.5 rounded-full border border-gray-200">
            <button className="px-8 py-2 rounded-full bg-white shadow-sm text-brand font-bold text-sm transition-all">
              Country
            </button>
            <button className="px-8 py-2 rounded-full text-secondary hover:bg-tertary hover:text-brand font-medium hover:font-bold hover:shadow-sm text-sm transition-all">
              Region
            </button>
            <button className="px-8 py-2 rounded-full text-secondary font-medium hover:bg-tertary hover:text-brand hover:font-bold hover:shadow-sm text-sm transition-all">
              Global
            </button>
          </div> */}
        </div>

        {/* 2. POPULAR DESTINATIONS GRID */}
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-2xl md:text-4xl font-bold hcol mb-2">Popular Destinations</h2>
          <p className="subheading text-gray-500">Choose a country to see available eSIM plans for your next trip.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
        </div>

        {/* 3. VIEW ALL BUTTON (Toggles based on state) */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-brand text-lg md:text-xl border-brand border-2 rounded-lg px-14 py-4 font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 cursor-pointer"
          >
            {showAll ? "Show Less" : "View All 150+ Countries"}
          </button>
        </div>

      </section>
    </div>
  );
};

export default HeroSearch;