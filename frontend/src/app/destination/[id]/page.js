"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import {
    Wifi, Phone, MessageSquare, ArrowLeft, Globe2,
    MapPin, Calendar, ArrowUpDown, ChevronDown, ChevronUp
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { allDestinations } from "@/data/destinationData";
import CoverageModal from "@/components/CoverageModal"; // 🌟 IMPORT IT HERE 🌟

// --- Helper to get Flag URL ---
const getFlagUrl = (isoCode) => {
    if (!isoCode) return "https://flagcdn.com/w80/un.png";
    return `https://flagcdn.com/w80/${isoCode.toLowerCase()}.png`;
};

// --- Helper to format Price ---
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
        return `${currencyCode} ${price.toFixed(2)}`;
    }
};

const getCountryDetails = (id) => {
    const foundCountry = allDestinations.find((dest) => dest.destinationID === id);
    if (foundCountry) {
        return { name: foundCountry.destinationName, iso: foundCountry.isoCode };
    }
    return { name: "Destination", iso: "UN" };
};

export default function DestinationPage() {
    const params = useParams();
    const router = useRouter();
    const destinationID = params.id;

    // States
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all");
    const [showAll, setShowAll] = useState(false);

    // 🌟 Sort State 🌟
    const [sortBy, setSortBy] = useState("featured");

    // 🌟 Expanded Countries State 🌟
    const [expandedPlanId, setExpandedPlanId] = useState(null);
    
    // 🌟 Coverage Modal State 🌟
    const [coverageModalData, setCoverageModalData] = useState(null);

    const countryInfo = getCountryDetails(destinationID);
    const { currency, loading: isCurrencyLoading } = useCurrency();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/get/sims/${destinationID}?countryCode=${currency}`);
                console.log(res.data.data.plans)
                setPlans(res.data.data.plans);
                setLoading(false);
            } catch (err) {
                setError("Failed to load eSIM plans. Please try again later.");
                setLoading(false);
            }
        };

        if (destinationID && !isCurrencyLoading) {
            fetchPlans();
        }
    }, [destinationID, currency, isCurrencyLoading]);

    // 1. FILTER LOGIC 
    const filteredPlans = plans.filter(plan => {
        if (filter === "all") return true;
        if (filter === "combo") {
            return plan.hasVoice && plan.hasSms;
        }
        return plan.category === filter;
    });

    // 2. 🌟 SORT LOGIC 🌟
    const sortedPlans = [...filteredPlans].sort((a, b) => {
        if (sortBy === "price-asc") return a.finalPrice - b.finalPrice;
        if (sortBy === "price-desc") return b.finalPrice - a.finalPrice;
        if (sortBy === "days-asc") return a.days - b.days;
        if (sortBy === "days-desc") return b.days - a.days;
        return 0; // default / featured
    });

    // 3. PAGINATION LOGIC (Using the sorted array)
    const displayedPlans = showAll ? sortedPlans : sortedPlans.slice(0, 8);

    const toggleCountries = (id) => {
        setExpandedPlanId(expandedPlanId === id ? null : id);
    };

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
                    <button onClick={() => router.push('/destination')} className="cursor-pointer text-brand hover:underline font-medium">Return to Destination</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans pb-20">
            <div className="bg-white border-b border-gray-200 pt-8 pb-12 px-4 shadow-sm">
                <div className="max-w-[1400px] mx-auto">
                    <button onClick={() => router.back()} className="cursor-pointer flex items-center gap-2 text-gray-500 hover:text-brand transition-colors mb-6 font-medium">
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

            <div className="max-w-[1400px] mx-auto px-4 mt-12">

                {/* 🌟 TOP BAR WITH SORTING 🌟 */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
                    <h2 className="text-2xl font-bold text-gray-800">Available Plans ({sortedPlans.length})</h2>

                    <div className="flex flex-col sm:flex-row w-full lg:w-auto items-start sm:items-center gap-4">

                        {/* Category Filters */}
                        <div className="flex justify-center items-center bg-white gap-2 p-1.5 rounded-full border border-gray-200 shadow-sm w-full sm:w-auto overflow-x-auto">
                            <button onClick={() => { setFilter("all"); setShowAll(false); }} className={`px-5 cursor-pointer py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${filter === "all" ? "bg-brand text-white shadow-sm" : "text-gray-500 hover:text-brand"}`}>All Plans</button>
                            <button onClick={() => { setFilter("data"); setShowAll(false); }} className={`px-5 py-2.5 cursor-pointer rounded-full font-bold text-sm transition-all whitespace-nowrap ${filter === "data" ? "bg-brand text-white shadow-sm" : "text-gray-500 hover:text-brand"}`}>Data Only</button>
                            <button onClick={() => { setFilter("combo"); setShowAll(false); }} className={`px-5 py-2.5 cursor-pointer rounded-full font-bold text-sm transition-all whitespace-nowrap ${filter === "combo" ? "bg-brand text-white shadow-sm" : "text-gray-500 hover:text-brand"}`}>Voice + SMS</button>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2 bg-white px-4 py-3.5 rounded-full border border-gray-200 shadow-sm w-full sm:w-auto shrink-0">
                            <ArrowUpDown size={16} className="text-gray-400 shrink-0" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer w-full"
                            >
                                <option value="featured">Sort by: Featured</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="days-asc">Validity: Short to Long</option>
                                <option value="days-desc">Validity: Long to Short</option>
                            </select>
                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayedPlans.map((plan) => (
                        <div key={plan.id} className="bg-white rounded-[20px] p-5 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                            <div className="flex justify-between items-start mb-4 gap-2">
                                <div>
                                    <h3 className="text-[17px] font-bold text-gray-900 leading-tight mb-1">
                                        {plan.data} {plan.dataUnit} {plan.category === "combo" ? "Combo" : "Data"}
                                    </h3>
                                    
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-extrabold text-gray-900 leading-none">
                                        {formatCurrency(plan.finalPrice, plan.displayCurrency)}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-4 mt-auto">
                                <div className="bg-blue-50/50 border border-blue-100 rounded-lg py-2.5 px-1 flex flex-col items-center justify-center gap-1.5 text-center">
                                    <Wifi size={18} className="text-blue-600" />
                                    <span className="text-[11px] font-bold text-gray-900 leading-none">
                                        {plan.data}{plan.dataUnit}
                                    </span>
                                </div>
                                <div className={`border rounded-lg py-2.5 px-1 flex flex-col items-center justify-center gap-1.5 text-center transition-colors ${plan.hasVoice ? 'bg-emerald-50/50 border-emerald-100' : 'bg-gray-50/50 border-gray-100 opacity-60'}`}>
                                    <Phone size={18} className={plan.hasVoice ? "text-emerald-600" : "text-gray-400"} />
                                    <span className={`text-[11px] leading-none ${plan.hasVoice ? "font-bold text-gray-900" : "font-semibold text-gray-400"}`}>{plan.hasVoice ? `${plan.voiceMinutes} Min` : "No Voice"}</span>
                                </div>
                                <div className={`border rounded-lg py-2.5 px-1 flex flex-col items-center justify-center gap-1.5 text-center transition-colors ${plan.hasSms ? 'bg-purple-50/50 border-purple-100' : 'bg-gray-50/50 border-gray-100 opacity-60'}`}>
                                    <MessageSquare size={18} className={plan.hasSms ? "text-purple-600" : "text-gray-400"} />
                                    <span className={`text-[11px] leading-none ${plan.hasSms ? "font-bold text-gray-900" : "font-semibold text-gray-400"}`}>{plan.hasSms ? `${plan.smsCount} SMS` : "No SMS"}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm text-gray-600 font-semibold">Validity: {plan.days} Days</p>
                                {plan.type === "3" && (
                                    <span className="text-[10px] font-bold bg-orange-50 border border-orange-200 text-orange-600 px-2 py-1 rounded uppercase tracking-wider shadow-sm">KYC Needed</span>
                                )}
                            </div>
                            
                            {/* 🌟 COVERAGE SECTION 🌟 */}
                            {plan.supportedCountries && plan.supportedCountries.length > 0 && (
                                <div className="mb-4">
                                    <button 
                                        onClick={() => setCoverageModalData(plan.supportedCountries)}
                                        className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 py-2 px-3 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <span className="flex items-center gap-1.5">
                                            <MapPin size={14} className="text-brand" />
                                            Coverage: {plan.supportedCountries.length} {plan.supportedCountries.length === 1 ? 'Country' : 'Countries'}
                                        </span>
                                        <ChevronDown size={16} />
                                    </button>
                                </div>
                            )}

                            <div className="flex gap-3 mb-4 mt-auto">
                                {/* 🌟 REDIRECTS TO NEW PAGE INSTEAD OF OPENING MODAL 🌟 */}
                                <button
                                    onClick={() => router.push(`/checkout/${plan.id}?dest=${destinationID}`)}
                                    className="flex-1 py-2.5 bg-brand text-white rounded-[10px] text-sm font-bold hover:bg-[#d94a0e] transition-all shadow-md shadow-brand/20 active:scale-95 cursor-pointer"
                                >
                                    Select Plan
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {sortedPlans.length > 8 && (
                    <div className="mt-12 text-center flex justify-center">
                        <button onClick={() => setShowAll(!showAll)} className="text-brand text-lg border-brand border-2 rounded-lg px-10 py-3 font-bold hover:bg-brand hover:text-white transition-all cursor-pointer">
                            {showAll ? "Show Less" : `View More Plans (${sortedPlans.length - 8})`}
                        </button>
                    </div>
                )}
            </div>

            {/* 🌟 MOUNT THE REUSABLE MODAL HERE 🌟 */}
            <CoverageModal 
                isOpen={!!coverageModalData} 
                onClose={() => setCoverageModalData(null)} 
                countries={coverageModalData} 
            />

        </div>
    );
}