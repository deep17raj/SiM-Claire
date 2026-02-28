"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { Wifi, Phone, MessageSquare, ArrowLeft, Globe2, MapPin } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

// --- Helper to get Flag URL ---
const getFlagUrl = (isoCode) => {
    if (!isoCode) return "https://flagcdn.com/w80/un.png";
    return `https://flagcdn.com/w80/${isoCode.toLowerCase()}.png`;
};

// --- Helper to format Price with correct Currency Symbol ---
const formatCurrency = (price, currencyCode) => {
    if (price === undefined || price === null) return "N/A";
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode || 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    } catch (e) {
        // Fallback just in case a weird currency code is sent
        return `${currencyCode} ${price.toFixed(2)}`; 
    }
};

// --- Helper to find Country Details (Fallback if backend doesn't send name) ---
const getCountryDetails = (id) => {
    const map = {
        "FR-1": { name: "France", iso: "FR" },
        "JYN-1": { name: "Japan", iso: "JP" },
        "USA-1": { name: "United States", iso: "US" },
        "EU-1": { name: "Europe", iso: "EU" }
    };
    return map[id] || { name: "Destination", iso: "UN" };
};

export default function DestinationPage() {
    const params = useParams();
    const router = useRouter();
    const destinationID = params.id;
    
    // We only need the currency code from context to send to the backend
    

    // States
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all");

    const countryInfo = getCountryDetails(destinationID);

   // 1. Grab `loading` from the context and rename it to `isCurrencyLoading`
const { currency, loading: isCurrencyLoading } = useCurrency();

useEffect(() => {
    const fetchPlans = async () => {
        try {
            console.log("Fetching for currency:", currency); // Should now say INR
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/get/sims/${destinationID}?countryCode=${currency}`);
            setPlans(res.data.data.plans || res.data.data.sims);
            setLoading(false);
        } catch (err) {
            setError("Failed to load eSIM plans. Please try again later.");
            setLoading(false);
        }
    };

    // 2. WAIT for the IP checker to finish before making the API call!
    if (destinationID && !isCurrencyLoading) {
        fetchPlans();
    }

// 3. Add `isCurrencyLoading` to the dependency array
}, [destinationID, currency, isCurrencyLoading]);

    // Filter Logic
    const filteredPlans = plans.filter(plan => {
        if (filter === "all") return true;
        return plan.category === filter;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
                <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Finding the best local networks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
                <div className="text-center bg-white p-10 rounded-2xl shadow-sm">
                    <p className="text-red-500 font-bold text-xl mb-4">{error}</p>
                    <button onClick={() => router.push('/')} className="text-brand hover:underline font-medium">Return to Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans pb-20">

            {/* 1. HERO BANNER */}
            <div className="bg-white border-b border-gray-200 pt-8 pb-12 px-4 shadow-sm">
                <div className="max-w-[1400px] mx-auto">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-brand transition-colors mb-6 font-medium">
                        <ArrowLeft size={18} /> Back to Destinations
                    </button>

                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg border-4 border-white relative bg-gray-100">
                            <img src={getFlagUrl(countryInfo.iso)} alt={countryInfo.name} className="object-cover w-full h-full" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">{countryInfo.name} eSIM</h1>
                            <p className="text-lg text-gray-500 flex items-center justify-center md:justify-start gap-2">
                                <Globe2 size={20} className="text-brand" /> Instant digital delivery. Connect instantly upon arrival.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. FILTERS & MAIN CONTENT */}
            <div className="max-w-[1400px] mx-auto px-4 mt-12">

                {/* Top Bar: Title & Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <h2 className="text-2xl font-bold text-gray-800">Available Plans ({filteredPlans.length})</h2>

                    <div className="flex bg-white gap-2 p-1.5 rounded-full border border-gray-200 shadow-sm w-full md:w-auto overflow-x-auto">
                        <button onClick={() => setFilter("all")} className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${filter === "all" ? "bg-brand text-white shadow-sm" : "text-gray-500 hover:text-brand"}`}>
                            All Plans
                        </button>
                        <button onClick={() => setFilter("data")} className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${filter === "data" ? "bg-brand text-white shadow-sm" : "text-gray-500 hover:text-brand"}`}>
                            Data Only
                        </button>
                        <button onClick={() => setFilter("combo")} className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${filter === "combo" ? "bg-brand text-white shadow-sm" : "text-gray-500 hover:text-brand"}`}>
                            Voice + SMS + Data
                        </button>
                    </div>
                </div>

                {/* 3. COMPACT PLAN CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPlans.map((plan) => (
                        <div key={plan.id} className="bg-white rounded-[20px] p-5 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">

                            {/* Title & Price Row */}
                            <div className="flex justify-between items-start mb-4 gap-2">
                                <div>
                                    <h3 className="text-[17px] font-bold text-gray-900 leading-tight mb-1">
                                        {countryInfo.name} {plan.tierLabel === "Unlimited" ? "Unlimited" : `${plan.data} ${plan.dataUnit}`} {plan.category === "combo" ? "Combo" : "Data"}
                                    </h3>
                                    <p className="text-xs text-gray-500 font-semibold flex items-center gap-1 uppercase tracking-wide">
                                        <MapPin size={12} className="text-gray-400" />
                                        {plan.local !== false ? "Local" : "Global/Regional"}
                                    </p>
                                </div>
                                
                                {/* 🌟 UPDATED PRICE DISPLAY 🌟 */}
                                <div className="text-right">
                                    <p className="text-2xl font-extrabold text-gray-900 leading-none">
                                        {formatCurrency(plan.finalPrice, plan.displayCurrency)}
                                    </p>
                                </div>

                            </div>

                            {/* 3 Feature Pills (Data, Voice, SMS) */}
                            <div className="grid grid-cols-3 gap-2 mb-4 mt-auto">
                                {/* Data Box */}
                                <div className="bg-blue-50/50 border border-blue-100 rounded-lg py-2.5 px-1 flex flex-col items-center justify-center gap-1.5 text-center">
                                    <Wifi size={18} className="text-blue-600" />
                                    <span className="text-[11px] font-bold text-gray-900 leading-none">
                                        {plan.tierLabel === "Unlimited" ? "Unlimited" : `${plan.data}${plan.dataUnit}`}
                                    </span>
                                </div>

                                {/* Voice Box */}
                                <div className={`border rounded-lg py-2.5 px-1 flex flex-col items-center justify-center gap-1.5 text-center transition-colors ${plan.hasVoice ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100 opacity-60'}`}>
                                    <Phone size={18} className={plan.hasVoice ? "text-gray-700" : "text-gray-300"} />
                                    <span className={`text-[11px] leading-none ${plan.hasVoice ? "font-bold text-gray-900" : "font-semibold text-gray-400"}`}>
                                        {plan.hasVoice ? `${plan.voiceMinutes} Min` : "No Voice"}
                                    </span>
                                </div>

                                {/* SMS Box */}
                                <div className={`border rounded-lg py-2.5 px-1 flex flex-col items-center justify-center gap-1.5 text-center transition-colors ${plan.hasSms ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100 opacity-60'}`}>
                                    <MessageSquare size={18} className={plan.hasSms ? "text-gray-700" : "text-gray-300"} />
                                    <span className={`text-[11px] leading-none ${plan.hasSms ? "font-bold text-gray-900" : "font-semibold text-gray-400"}`}>
                                        {plan.hasSms ? `${plan.smsCount} SMS` : "No SMS"}
                                    </span>
                                </div>
                            </div>

                            {/* Duration Text */}
                            <p className="text-sm text-gray-600 font-semibold mb-4">
                                {plan.days} Days
                            </p>

                            {/* Action Buttons Side-by-Side */}
                            <div className="flex gap-3 mb-4">
                                <button className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-[10px] text-sm font-bold hover:bg-gray-50 hover:border-gray-400 transition-all">
                                    View Details
                                </button>
                                <button className="flex-1 py-2.5 bg-brand text-white rounded-[10px] text-sm font-bold hover:bg-[#d94a0e] transition-all shadow-md shadow-brand/20 active:scale-95">
                                    Select Plan
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Empty State if filtering yields no results */}
                {filteredPlans.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <Wifi size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No plans found</h3>
                        <p className="text-gray-500">We don't have any {filter === 'combo' ? 'Voice + SMS' : 'Data'} plans for this destination right now.</p>
                        <button onClick={() => setFilter("all")} className="mt-6 text-brand font-bold hover:underline">View All Plans</button>
                    </div>
                )}

            </div>
        </div>
    );
}