"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { 
    Wifi, Phone, MessageSquare, ArrowLeft, Globe2, 
    MapPin, Calendar, Info, ChevronLeft, ShieldCheck, Tag, Smartphone 
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { allDestinations } from "@/data/destinationData"; 

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
    
    // 🌟 Checkout View States 🌟
    const [checkoutPlan, setCheckoutPlan] = useState(null);
    const [promoCode, setPromoCode] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false); // New state for terms checkbox

    const countryInfo = getCountryDetails(destinationID);
    const { currency, loading: isCurrencyLoading } = useCurrency();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/get/sims/${destinationID}?countryCode=${currency}`);
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

    // FILTER LOGIC 
    const filteredPlans = plans.filter(plan => {
        if (filter === "all") return true;
        if (filter === "combo") {
            return plan.hasVoice && plan.hasSms;
        }
        return plan.category === filter;
    });

    const displayedPlans = showAll ? filteredPlans : filteredPlans.slice(0, 8);

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

    // 🌟 CHECKOUT VIEW RENDER 🌟
    if (checkoutPlan) {
        return (
            <div className="min-h-screen mt-4 bg-[#fafafa] font-sans pb-20 pt-8 animate-in fade-in duration-300">
                <div className="max-w-3xl mx-auto px-4">
                    
                    {/* Checkout Header */}
                    <div className="flex flex-col items-center mb-8 relative">
                        <button 
                            onClick={() => {
                                setCheckoutPlan(null);
                                setAgreedToTerms(false); // Reset terms on back
                            }} 
                            className="absolute left-0 -top-5 md:top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors bg-white border border-gray-200 px-4 py-2 rounded-full cursor-pointer shadow-sm"
                        >
                            <ChevronLeft size={16} /> Back
                        </button>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Secure Checkout</h1>
                        <div className="w-12 h-1 bg-brand rounded-full mt-3"></div>
                    </div>

                    {/* Main Checkout Card */}
                    <div className="bg-[#fff9f5] border border-orange-100 rounded-[2rem] p-6 md:p-10 shadow-lg shadow-orange-500/5">
                        
                        {/* Title Row: Flag + Name + Data */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border-2 border-white shrink-0">
                                    <img src={getFlagUrl(countryInfo.iso)} alt={countryInfo.name} className="w-full h-full object-cover" />
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900">{countryInfo.name} eSIM</h2>
                            </div>
                            <div className="text-right shrink-0">
                                <span className="text-xl md:text-2xl font-black text-brand">
                                    {checkoutPlan.data} {checkoutPlan.dataUnit}
                                </span>
                            </div>
                        </div>

                        {/* Details List */}
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center py-2 border-b border-orange-200/50">
                                <span className="text-gray-500 flex items-center gap-2"><Calendar size={18} /> Validity</span>
                                <span className="font-bold text-gray-900">{checkoutPlan.days} days</span>
                            </div>
                            
                            <div className="flex justify-between items-center py-2 border-b border-orange-200/50">
                                <span className="text-gray-500 flex items-center gap-2"><Wifi size={18} /> Service Type</span>
                                <span className="font-bold text-gray-900">
                                    {checkoutPlan.category === "combo" ? "Data + Voice + SMS" : "Data Only"}
                                </span>
                            </div>

                            {/* 🌟 NEW: Vertically stacked included limits 🌟 */}
                            <div className="flex justify-between items-start py-2 border-b border-orange-200/50">
                                <span className="text-gray-500 flex items-center gap-2 mt-1"><Info size={18} /> Included limits</span>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg border border-orange-100 shadow-sm">
                                        {checkoutPlan.data} {checkoutPlan.dataUnit} Data
                                    </span>
                                    {checkoutPlan.hasVoice && (
                                        <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg border border-orange-100 shadow-sm mt-1">
                                            {checkoutPlan.voiceMinutes} Min Calls
                                        </span>
                                    )}
                                    {checkoutPlan.hasSms && (
                                        <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg border border-orange-100 shadow-sm mt-1">
                                            {checkoutPlan.smsCount} SMS
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-orange-200/50">
                                <span className="text-gray-500 flex items-center gap-2"><Globe2 size={18} /> Coverage</span>
                                <span className="font-bold text-brand">
                                    {checkoutPlan.local ? "Local Network" : "Global"}
                                </span>
                            </div>
                        </div>

                        {/* 🌟 NEW: Check Compatibility Button 🌟 */}
                        <div className="mb-8">
                            <button className="w-full py-3.5 border-2 border-brand text-brand bg-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors cursor-pointer shadow-sm">
                                <Smartphone size={18} /> Check if my device is compatible
                            </button>
                        </div>

                        {/* Important Notice */}
                        <div className="bg-white border border-orange-100 rounded-xl p-4 mb-8 flex items-start gap-3 shadow-sm">
                            <Info size={20} className="text-brand shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-700 font-medium">
                                The validity period starts only when you begin using data with any supported network at your destination.
                            </p>
                        </div>

                        {/* Promo Code Section */}
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                <Tag size={16} className="text-gray-400" /> Have a Promo Code?
                            </label>
                            <div className="flex gap-2 w-full md:w-[80%]">
                                <input 
                                    type="text" 
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                    placeholder="Enter code here"
                                    className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 font-medium outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all uppercase placeholder:normal-case"
                                />
                                <button className="px-4 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed" disabled={!promoCode}>
                                    Apply
                                </button>
                            </div>
                        </div>

                        {/* 🌟 NEW: Terms and Conditions Checkbox 🌟 */}
                        <div className="flex items-start gap-3 mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                            <input 
                                type="checkbox" 
                                id="terms" 
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="mt-1 w-5 h-5 text-brand accent-brand cursor-pointer shrink-0" 
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600 leading-snug cursor-pointer select-none">
                                I confirm my device is network-unlocked and eSIM compatible. I agree to the <a href="#" className="text-brand font-bold hover:underline">Terms & Conditions</a> and <a href="#" className="text-brand font-bold hover:underline">Privacy Policy</a>.
                            </label>
                        </div>

                        {/* Final Buy Button */}
                        <button 
                            disabled={!agreedToTerms}
                            className={`w-full py-4.5 text-xl rounded-2xl font-bold flex justify-center items-center gap-2 transition-all cursor-pointer ${
                                agreedToTerms 
                                ? "bg-brand text-white shadow-xl shadow-brand/30 hover:bg-[#d94a0e] hover:-translate-y-0.5 active:translate-y-0" 
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            <ShieldCheck size={24} className={agreedToTerms ? "text-white" : "text-gray-400"} />
                            Pay Securely • {formatCurrency(checkoutPlan.finalPrice, checkoutPlan.displayCurrency)}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 🌟 STANDARD DESTINATION VIEW (When not in checkout) 🌟
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
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <h2 className="text-2xl font-bold text-gray-800">Available Plans ({filteredPlans.length})</h2>
                    <div className="flex bg-white gap-2 p-1.5 rounded-full border border-gray-200 shadow-sm w-full md:w-auto overflow-x-auto">
                        <button onClick={() => { setFilter("all"); setShowAll(false); }} className={`px-5 cursor-pointer py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${filter === "all" ? "bg-brand text-white shadow-sm" : "text-gray-500 hover:text-brand"}`}>All Plans</button>
                        <button onClick={() => { setFilter("data"); setShowAll(false); }} className={`px-5 py-2.5 cursor-pointer rounded-full font-bold text-sm transition-all whitespace-nowrap ${filter === "data" ? "bg-brand text-white shadow-sm" : "text-gray-500 hover:text-brand"}`}>Data Only</button>
                        <button onClick={() => { setFilter("combo"); setShowAll(false); }} className={`px-5 py-2.5 cursor-pointer rounded-full font-bold text-sm transition-all whitespace-nowrap ${filter === "combo" ? "bg-brand text-white shadow-sm" : "text-gray-500 hover:text-brand"}`}>Voice + SMS</button>
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
                                    <p className="text-xs text-gray-500 font-semibold flex items-center gap-1 uppercase tracking-wide">
                                        <MapPin size={12} className="text-gray-400" /> {plan.local ? "Local" : "Global"}
                                    </p>
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

                            <div className="flex gap-3 mb-4">
                                <button 
                                    onClick={() => setCheckoutPlan(plan)}
                                    className="flex-1 py-2.5 bg-brand text-white rounded-[10px] text-sm font-bold hover:bg-[#d94a0e] transition-all shadow-md shadow-brand/20 active:scale-95 cursor-pointer"
                                >
                                    Select Plan
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPlans.length > 8 && (
                    <div className="mt-12 text-center flex justify-center">
                        <button onClick={() => setShowAll(!showAll)} className="text-brand text-lg border-brand border-2 rounded-lg px-10 py-3 font-bold hover:bg-brand hover:text-white transition-all cursor-pointer">
                            {showAll ? "Show Less" : `View More Plans (${filteredPlans.length - 8})`}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}