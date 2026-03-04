"use client";

import { useState, useMemo } from "react";
import { Search, Smartphone, CheckCircle2, XCircle, Info, ChevronDown, Lock } from "lucide-react";

// Exhaustive database of eSIM compatible devices
const deviceDatabase = [
  {
    brand: "Apple",
    models: [
      "iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max",
      "iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max",
      "iPhone 13", "iPhone 13 mini", "iPhone 13 Pro", "iPhone 13 Pro Max",
      "iPhone 12", "iPhone 12 mini", "iPhone 12 Pro", "iPhone 12 Pro Max",
      "iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro Max",
      "iPhone XS", "iPhone XS Max", "iPhone XR",
      "iPhone SE (3rd Gen - 2022)", "iPhone SE (2nd Gen - 2020)"
    ]
  },
  {
    brand: "Samsung",
    models: [
      "Galaxy S24", "Galaxy S24+", "Galaxy S24 Ultra",
      "Galaxy S23", "Galaxy S23+", "Galaxy S23 Ultra", "Galaxy S23 FE",
      "Galaxy S22", "Galaxy S22+", "Galaxy S22 Ultra",
      "Galaxy S21", "Galaxy S21+", "Galaxy S21 Ultra",
      "Galaxy S20", "Galaxy S20+", "Galaxy S20 Ultra",
      "Galaxy Z Fold5", "Galaxy Z Fold4", "Galaxy Z Fold3", "Galaxy Z Fold2", "Galaxy Fold",
      "Galaxy Z Flip5", "Galaxy Z Flip4", "Galaxy Z Flip3", "Galaxy Z Flip",
      "Galaxy Note 20", "Galaxy Note 20 Ultra",
      "Galaxy A54 5G"
    ]
  },
  {
    brand: "Google",
    models: [
      "Pixel 8", "Pixel 8 Pro",
      "Pixel 7", "Pixel 7 Pro", "Pixel 7a",
      "Pixel 6", "Pixel 6 Pro", "Pixel 6a",
      "Pixel 5", "Pixel 5a",
      "Pixel 4", "Pixel 4 XL", "Pixel 4a", "Pixel 4a 5G",
      "Pixel Fold"
    ]
  },
  {
    brand: "Motorola",
    models: [
      "Motorola Razr 40", "Motorola Razr 40 Ultra",
      "Motorola Razr+ (2023)", "Motorola Razr (2022)", "Motorola Razr 5G",
      "Motorola Edge 40", "Motorola Edge 40 Pro", "Motorola Edge+ (2023)"
    ]
  },
  {
    brand: "Sony",
    models: [
      "Xperia 1 V", "Xperia 1 IV",
      "Xperia 5 IV",
      "Xperia 10 V", "Xperia 10 IV"
    ]
  },
  {
    brand: "Xiaomi",
    models: [
      "Xiaomi 13", "Xiaomi 13 Pro", "Xiaomi 13T", "Xiaomi 13T Pro",
      "Xiaomi 12T Pro"
    ]
  },
  {
    brand: "Oppo & OnePlus",
    models: [
      "Oppo Find X5", "Oppo Find X5 Pro", "Oppo Find X3 Pro",
      "Oppo Find N2 Flip",
      "OnePlus 12", "OnePlus 11"
    ]
  }
];

export default function SupportedDevicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedBrand, setExpandedBrand] = useState("Apple"); // Default open for the accordion

  // Flatten the database for easy searching
  const flatDevices = useMemo(() => {
    let all = [];
    deviceDatabase.forEach(brandObj => {
      brandObj.models.forEach(model => {
        all.push({ brand: brandObj.brand, model: model });
      });
    });
    return all;
  }, []);

  // Live filter based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const lowerQuery = searchQuery.toLowerCase().trim();
    
    return flatDevices.filter(device => 
      device.model.toLowerCase().includes(lowerQuery) || 
      device.brand.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, flatDevices]);

  const toggleBrand = (brand) => {
    setExpandedBrand(expandedBrand === brand ? null : brand);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans pb-24 pt-12 md:pt-20">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* 1. Header Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-6">
            <Smartphone size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Supported Devices
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Search for your phone model below to instantly see if it supports eSIM technology.
          </p>
        </div>

        {/* 2. Important Note (Carrier Lock) */}
        <div className="bg-white border border-orange-100 rounded-2xl p-5 mb-8 flex items-start gap-4 shadow-sm">
          <div className="bg-orange-50 text-brand p-2 rounded-lg shrink-0 mt-0.5">
            <Lock size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Your device must be Carrier Unlocked</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Even if your phone supports eSIM, it must be completely unlocked by your network provider to use SiM Claire. You can usually check this in your phone's Settings under "Network Provider Lock" or "Carrier Lock".
            </p>
          </div>
        </div>

        {/* 3. Search Bar Area */}
        <div className="bg-white rounded-[2rem] shadow-lg shadow-gray-200/50 border border-gray-100 p-6 md:p-8 mb-12 relative z-10">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400">
              <Search size={22} className={searchQuery ? "text-brand transition-colors" : ""} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. iPhone 15 Pro, Galaxy S23..."
              className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 font-medium text-base sm:text-lg outline-none focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all placeholder:text-gray-400 placeholder:font-normal"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <XCircle size={20} />
              </button>
            )}
          </div>

          {/* 🌟 LIVE SEARCH RESULTS 🌟 */}
          {searchQuery.trim() !== "" && (
            <div className="mt-6 animate-in fade-in duration-200">
              {searchResults.length > 0 ? (
                <div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 mb-4 flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-600 shrink-0" size={24} />
                    <p className="text-emerald-800 font-medium">
                      We found <span className="font-bold">{searchResults.length}</span> matching {searchResults.length === 1 ? "device" : "devices"}!
                    </p>
                  </div>
                  <ul className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-50 shadow-sm overflow-hidden">
                    {searchResults.map((device, idx) => (
                      <li key={idx} className="p-4 px-5 flex items-center gap-3 text-gray-800 hover:bg-gray-50 transition-colors">
                        <Smartphone size={18} className="text-gray-400 shrink-0" />
                        <span className="font-bold">{device.model}</span>
                        <span className="text-sm text-gray-400 ml-auto">{device.brand}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                  <div className="bg-red-100 text-red-600 p-2.5 rounded-full shrink-0">
                    <XCircle size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-red-800 text-xl mb-1">No matching devices found.</h3>
                    <p className="text-red-700 font-medium text-sm md:text-base mb-3">
                      Please check the spelling, or try searching for just the base model (e.g., "S22" instead of "Samsung Galaxy S22").
                    </p>
                    <div className="bg-white/60 p-4 rounded-xl border border-red-100">
                      <p className="text-red-900 font-bold mb-1">Still not sure?</p>
                      <p className="text-red-800 text-sm">
                        Dial <span className="text-black font-extrabold text-base px-1">*#06#</span> on your phone's keypad. If you see an <span className="font-bold text-black">EID</span> number on the screen, your phone is eSIM compatible!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 4. Full Exhaustive List (Visible when not searching) */}
        {searchQuery.trim() === "" && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Info className="text-brand" size={24} /> Complete Compatibility List
            </h2>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              {deviceDatabase.map((brandInfo) => (
                <div key={brandInfo.brand} className="border-b border-gray-100 last:border-b-0">
                  
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleBrand(brandInfo.brand)}
                    className="w-full flex items-center justify-between p-5 md:p-6 bg-white hover:bg-gray-50 transition-colors cursor-pointer outline-none"
                  >
                    <span className="font-bold text-lg text-gray-900">{brandInfo.brand}</span>
                    <div className={`p-1.5 rounded-full transition-transform duration-300 ${expandedBrand === brandInfo.brand ? "bg-brand/10 text-brand rotate-180" : "bg-gray-100 text-gray-500"}`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>

                  {/* Accordion Body */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedBrand === brandInfo.brand ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-5 md:p-6 pt-0 bg-white grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                      {brandInfo.models.map((model, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-600 border-b border-gray-50 pb-2 last:border-0 sm:last:border-b sm:[&:nth-last-child(2)]:border-0">
                          <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                          <span className="text-sm font-medium">{model}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>

            <p className="text-center text-sm text-gray-400 mt-8 font-medium px-4">
              * Note: Device compatibility can vary by region and carrier. Devices purchased in China, Hong Kong, or Macao often do not support eSIM.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}