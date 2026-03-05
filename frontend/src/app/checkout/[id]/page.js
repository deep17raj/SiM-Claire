"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import DeviceCompatibilityModal from "@/components/DeviceCompatibilityModal"; // Adjust path
import { 
    Wifi, Phone, MessageSquare, Globe2, 
    Calendar, Info, ChevronLeft, ShieldCheck, Tag, Smartphone, MapPin
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { allDestinations } from "@/data/destinationData"; 
import  CoverageModal  from "@/components/CoverageModal"; // Ensure this imports from your destination page!

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

// --- Helper to find Country Details ---
const getCountryDetails = (id) => {
    const foundCountry = allDestinations.find((dest) => dest.destinationID === id);
    if (foundCountry) {
        return { name: foundCountry.destinationName, iso: foundCountry.isoCode };
    }
    return { name: "Destination", iso: "UN" };
};

export default function CheckoutPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    
    // Get IDs from the URL (e.g., /checkout/eSIM-JP500M-01?dest=JYN-1)
    const planID = params.id;
    const destinationID = searchParams.get("dest");

    // States
    const [checkoutPlan, setCheckoutPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Form States
    const [promoCode, setPromoCode] = useState("");
    const [isPromoOpen, setIsPromoOpen] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // 🌟 Coverage Modal State 🌟
    const [coverageModalData, setCoverageModalData] = useState(null);

    const { currency, loading: isCurrencyLoading } = useCurrency();
    const countryInfo = getCountryDetails(destinationID);

    useEffect(() => {
        const fetchSpecificPlan = async () => {
            if (!destinationID || !planID) {
                setError("Invalid checkout link.");
                setLoading(false);
                return;
            }

            try {
                // Fetch the plans for this destination
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/get/sims/${destinationID}?countryCode=${currency}`);
                const allPlans = res.data.data.plans;
                
                // Find the exact plan the user clicked on
                const selectedPlan = allPlans.find(p => p.id === planID);
                
                if (selectedPlan) {
                    setCheckoutPlan(selectedPlan);
                } else {
                    setError("We couldn't find this specific plan. It may have expired.");
                }
                setLoading(false);
            } catch (err) {
                setError("Failed to load checkout details. Please try again.");
                setLoading(false);
            }
        };

        if (!isCurrencyLoading) {
            fetchSpecificPlan();
        }
    }, [destinationID, planID, currency, isCurrencyLoading]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
                <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Securing your checkout...</p>
            </div>
        );
    }

    if (error || !checkoutPlan) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
                <div className="text-center bg-white p-10 rounded-2xl shadow-sm max-w-md mx-4">
                    <p className="text-red-500 font-bold text-xl mb-4">{error}</p>
                    <button onClick={() => router.back()} className="w-full py-3 bg-brand text-white rounded-xl font-bold hover:bg-[#d94a0e] transition-all cursor-pointer">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans pb-20 pt-8 md:pt-12 animate-in fade-in duration-300">
            <div className="max-w-3xl mx-auto px-4">
                
                {/* Checkout Header */}
                <div className="flex flex-col items-center mb-8 md:mb-10 relative">
                    <button 
                        onClick={() => router.back()} 
                        className="absolute left-0 -top-2 md:top-1/2 md:-translate-y-1/2 flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-brand transition-colors px-4 py-2 rounded-full cursor-pointer "
                    >
                        <ChevronLeft size={16} /> Back
                    </button>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-10 md:mt-0">Secure Checkout</h1>
                    <div className="w-12 h-1.5 bg-brand rounded-full mt-3"></div>
                </div>

                {/* Main Checkout Card */}
                <div className="bg-[#fff9f5] border border-orange-100 rounded-[2rem] p-6 md:p-10 shadow-lg shadow-orange-500/5">
                    
                    {/* Title Row: Flag + Name + Data */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-md border-2 border-white shrink-0">
                                <img src={getFlagUrl(countryInfo.iso)} alt={countryInfo.name} className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{countryInfo.name} eSIM</h2>
                        </div>
                        <div className="text-right shrink-0">
                            <span className="text-xl md:text-3xl font-black text-brand">
                                {checkoutPlan.data} {checkoutPlan.dataUnit}
                            </span>
                        </div>
                    </div>

                    {/* Details List */}
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center py-3 border-b border-orange-200/50">
                            <span className="text-gray-500 flex items-center gap-2"><Calendar size={18} /> Validity</span>
                            <span className="font-bold text-gray-900 text-lg">{checkoutPlan.days} days</span>
                        </div>
                        
                        <div className="flex justify-between items-center py-3 border-b border-orange-200/50">
                            <span className="text-gray-500 flex items-center gap-2"><Globe2 size={18} /> Coverage</span>
                            {/* 🌟 COVERAGE LINK REPLACING STATIC TEXT 🌟 */}
                            {checkoutPlan.supportedCountries && checkoutPlan.supportedCountries.length > 0 ? (
                                <button 
                                    onClick={() => setCoverageModalData(checkoutPlan.supportedCountries)}
                                    className="font-bold text-brand text-lg flex items-center gap-1 hover:underline cursor-pointer"
                                >
                                    {checkoutPlan.supportedCountries.length} Countries <MapPin size={16} />
                                </button>
                            ) : (
                                <span className="font-bold text-brand text-lg">
                                    {checkoutPlan.local ? "Local Coverage" : "Global Coverage"}
                                </span>
                            )}
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-orange-200/50">
                            <span className="text-gray-500 flex items-center gap-2"><Wifi size={18} /> Data Limit</span>
                            <span className="font-bold text-gray-900 text-lg">
                                {checkoutPlan.data} {checkoutPlan.dataUnit}
                            </span>
                        </div>

                        {checkoutPlan.hasVoice && (
                            <div className="flex justify-between items-center py-3 border-b border-orange-200/50">
                                <span className="text-gray-500 flex items-center gap-2"><Phone size={18} /> Calls</span>
                                <span className="font-bold text-gray-900 text-lg">
                                    {checkoutPlan.voiceMinutes} Minutes
                                </span>
                            </div>
                        )}

                        {checkoutPlan.hasSms && (
                            <div className="flex justify-between items-center py-3 border-b border-orange-200/50">
                                <span className="text-gray-500 flex items-center gap-2"><MessageSquare size={18} /> SMS</span>
                                <span className="font-bold text-gray-900 text-lg">
                                    {checkoutPlan.smsCount} Sms
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Check Compatibility Button */}
                    <div className="mb-8 mt-8">
                        <button 
                            onClick={() => setIsModalOpen(true)} 
                            className="w-full py-4 border-2 border-brand text-brand bg-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand hover:text-tertary transition-colors cursor-pointer shadow-sm text-lg"
                        >
                            <Smartphone size={20} /> Check if my device is compatible
                        </button>
                    </div>
                    

                    {/* Promo Code Section (Toggleable) */}
                    <div className="mb-8 bg-white p-5 rounded-2xl border border-orange-100 shadow-sm">
                        <button 
                            type="button"
                            onClick={() => setIsPromoOpen(!isPromoOpen)}
                            className="flex items-center justify-between w-full text-left font-bold text-gray-800 hover:text-brand transition-colors cursor-pointer outline-none"
                        >
                            <span className="flex items-center gap-2">
                                <Tag size={18} className={isPromoOpen ? "text-brand" : "text-gray-400"} /> 
                                Have a Promo Code?
                            </span>
                            <span className="text-2xl leading-none text-gray-400">{isPromoOpen ? "-" : "+"}</span>
                        </button>
                        
                        {isPromoOpen && (
                            <div className="flex flex-col sm:flex-row gap-3 w-full mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                <input
                                    type="text"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                    placeholder="Enter code here"
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 font-medium outline-none focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all uppercase placeholder:normal-case"
                                />
                                <button className="px-8 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed" disabled={!promoCode}>
                                    Apply
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Terms and Conditions Checkbox */}
                    <div className="flex items-start gap-3 mb-8 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="mt-1 w-5 h-5 text-brand accent-brand cursor-pointer shrink-0 rounded border-gray-300 focus:ring-brand"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600 leading-snug cursor-pointer select-none">
                            I confirm my device is network-unlocked and eSIM compatible. I agree to the{' '}
                            <a 
                                href="/terms" 
                                className="text-brand font-bold hover:underline"
                                onClick={(e) => e.stopPropagation()} 
                            >
                                Terms & Conditions
                            </a> 
                            {' '}and{' '}
                            <a 
                                href="/privacy" 
                                className="text-brand font-bold hover:underline"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Privacy Policy
                            </a>.
                        </label>
                    </div>

                    {/* Final Buy Button */}
                    <button
                        disabled={!agreedToTerms}
                        className={`w-full py-5 text-xl rounded-2xl font-bold flex justify-center items-center gap-3 transition-all cursor-pointer ${agreedToTerms
                                ? "bg-tertary text-brand border-brand border-2 hover:bg-brand hover:text-tertary hover:-translate-y-0.5 active:translate-y-0"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        <ShieldCheck size={26} className={agreedToTerms ? "text-white" : "text-gray-400"} />
                        Pay Securely • {formatCurrency(checkoutPlan.finalPrice, checkoutPlan.displayCurrency)}
                    </button>

                    {/* Security Badge */}
                    <p className="text-center text-xs text-gray-400 font-medium mt-4 uppercase tracking-widest flex items-center justify-center gap-1.5">
                        <ShieldCheck size={14} /> 256-bit Secure Encryption
                    </p>
                </div>
            </div>
            
            <DeviceCompatibilityModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />

            {/* 🌟 NEW COVERAGE MODAL INSTANCE 🌟 */}
            <CoverageModal 
                isOpen={!!coverageModalData} 
                onClose={() => setCoverageModalData(null)} 
                countries={coverageModalData} 
            />
        </div>
    );
}