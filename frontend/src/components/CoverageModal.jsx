"use client";

import { useState } from "react";
import { X, Search } from "lucide-react";
import { countryIsoMap } from "@/data/countryIsoMap"; // 🌟 Import the new mapping file

// --- Helper to get Flag URL ---
const getFlagUrl = (isoCode) => {
    if (!isoCode) return "https://flagcdn.com/w80/un.png";
    return `https://flagcdn.com/w80/${isoCode.toLowerCase()}.png`;
};

export default function CoverageModal({ isOpen, onClose, countries }) {
    const [searchQuery, setSearchQuery] = useState("");

    if (!isOpen || !countries) return null;

    const filteredCountries = countries.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

    // 🌟 Instantly find the ISO code using the dictionary 🌟
    const getIsoCodeFromName = (name) => {
        const normalizedName = name.trim().toLowerCase();
        return countryIsoMap[normalizedName] || "un"; // Fallback to 'un' flag if not found
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
                    <h2 className="text-xl font-bold text-gray-900">Supported Countries</h2>
                    <button 
                        onClick={() => {
                            onClose();
                            setSearchQuery("");
                        }}
                        className="text-gray-600 hover:text-gray-900 flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer"
                    >
                        Close <X size={18} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="p-4 border-b border-gray-100 shrink-0">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                            <Search size={18} />
                        </div>
                        <input 
                            type="text"
                            placeholder="Search for country"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                        />
                    </div>
                </div>

                {/* Country List */}
                <div className="overflow-y-auto p-2 flex-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                    {filteredCountries.map((country, idx) => {
                        const iso = getIsoCodeFromName(country);
                        return (
                            <div key={idx} className="flex items-center gap-4 p-3 px-4 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm border border-gray-100 bg-gray-100">
                                    <img src={getFlagUrl(iso)} alt={country} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-base font-medium text-gray-700">{country}</span>
                            </div>
                        );
                    })}
                    {filteredCountries.length === 0 && (
                        <div className="p-6 text-center text-gray-500 text-sm font-medium">No countries found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}