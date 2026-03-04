"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { X, CheckCircle2, Smartphone, Info, Search, Phone } from "lucide-react";

export default function DeviceCompatibilityModal({ isOpen, onClose }) {
  const router = useRouter();
  const [status, setStatus] = useState("idle"); // idle, checking, success, verify, fail

  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setTimeout(() => setStatus("idle"), 300);
  };

  const handleAutoCheck = async () => {
    setStatus("checking");

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/device/check-compatibility`, {
        "userAgent": navigator.userAgent
      });
      
      const apiData = res.data.data || res.data;

      if (apiData.confidence === "high" && apiData.requires_manual_selection === false) {
        setStatus("success");
      } else {
        setStatus("verify");
      }

    } catch (err) {
      console.error("Error checking device", err);
      setStatus("verify");
    }
  };

  if (!isOpen) return null;

  return (
    // 🌟 Premium Backdrop: slightly darker with a stronger blur
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* 🌟 Premium Container: Hidden scrollbar, large border radius, subtle gradient background */}
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-[2rem] bg-gradient-to-b from-white to-gray-50/50 shadow-2xl shadow-black/20 border border-white/60 relative animate-in zoom-in-95 duration-300 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* Floating Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-gray-400 hover:text-gray-800 bg-gray-100/80 hover:bg-gray-200 p-2 rounded-full transition-all z-10 cursor-pointer backdrop-blur-sm"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        <div className="p-6 sm:p-8 pt-10 sm:pt-10">
          
          {/* STATE 1: IDLE */}
          {status === "idle" && (
            <div className="text-center animate-in fade-in duration-300">
              <div className="w-20 h-20 bg-gradient-to-tr from-brand/20 to-brand/5 text-brand rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-brand/10">
                <Smartphone size={36} strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">
                Device Compatibility
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Let's check if the device you are currently using supports eSIM technology.
              </p>
              <button 
                onClick={handleAutoCheck}
                className="w-full py-4 bg-gray-900 text-white text-lg font-bold rounded-2xl hover:bg-black hover:shadow-xl hover:shadow-gray-900/20 hover:-translate-y-0.5 transition-all cursor-pointer active:scale-95"
              >
                Auto-Detect My Device
              </button>
            </div>
          )}

          {/* STATE 2: CHECKING */}
          {status === "checking" && (
            <div className="text-center py-12 animate-in fade-in duration-300">
              <div className="w-14 h-14 border-[4px] border-brand/30 border-t-brand rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">Analyzing Device</h2>
              <p className="font-medium text-gray-500">Checking system capabilities...</p>
            </div>
          )}

          {/* STATE 3: SUCCESS */}
          {status === "success" && (
            <div className="text-center animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-gradient-to-tr from-emerald-100 to-emerald-50 text-emerald-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-emerald-200/50">
                <CheckCircle2 size={40} strokeWidth={2} />
              </div>
              <h3 className="font-extrabold text-gray-900 text-2xl mb-3 tracking-tight">Great news!</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Your device is fully eSIM compatible. You are ready to purchase a plan and travel.
              </p>
              
              <button 
                onClick={handleClose}
                className="w-full py-4 bg-emerald-600 text-white text-lg font-bold rounded-2xl hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 hover:-translate-y-0.5 transition-all cursor-pointer active:scale-95"
              >
                Awesome, close this
              </button>
            </div>
          )}

          {/* STATE 4: VERIFY (Premium Manual Check) */}
          {status === "verify" && (
            <div className="text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-gradient-to-tr from-orange-100 to-orange-50 text-orange-500 rounded-[1.2rem] flex items-center justify-center mx-auto mb-5 shadow-inner border border-orange-200/50">
                <Info size={32} strokeWidth={2} />
              </div>
              <h3 className="font-extrabold text-gray-900 text-2xl mb-2 tracking-tight">Manual Check Required</h3>
              <p className="text-gray-500 font-medium mb-6 text-sm sm:text-base leading-relaxed">
                Due to recent browser privacy updates, we cannot detect your exact device model automatically.
              </p>
              
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-left mb-6 relative overflow-hidden">
                {/* Subtle decorative accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-400"></div>
                
                <p className="font-bold text-gray-800 mb-3">How to check your phone:</p>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-gray-400 mt-0.5">1.</span>
                    <span className="leading-relaxed">
                      Dial 
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 mx-1.5   text-gray-900 font-mono font-bold  text-xs">
                        <Phone size={12} className="text-brand" /> *#06#
                      </span> 
                      on your phone's keypad. If an <span className="font-extrabold text-black">EID</span> number appears, you are compatible!
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-gray-400 mt-0.5">2.</span>
                    <span>Or, search for your device manually.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleClose}
                  className="w-full py-4 bg-brand text-white text-base font-bold rounded-2xl hover:bg-[#d94a0e] hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-0.5 transition-all cursor-pointer active:scale-95"
                >
                  Got it, I'll check my phone
                </button>
                <button 
                  onClick={() => {
                    handleClose();
                    router.push("/supported-devices"); 
                  }}
                  className="w-full py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all cursor-pointer shadow-sm active:scale-95 flex items-center justify-center gap-2"
                >
                  <Search size={18} className="text-gray-400" /> Search Device Manually
                </button>
              </div>
            </div>
          )}

          {/* STATE 5: FAIL */}
          {status === "fail" && (
            <div className="text-center animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-gradient-to-tr from-red-100 to-red-50 text-red-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-red-200/50">
                <XCircle size={40} strokeWidth={2} />
              </div>
              <h3 className="font-extrabold text-gray-900 text-2xl mb-3 tracking-tight">Not Compatible</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Sorry, it looks like this device does not support eSIM technology.
              </p>
              
              <button 
                onClick={handleClose} 
                className="w-full py-4 bg-gray-100 text-gray-800 text-lg font-bold rounded-2xl hover:bg-gray-200 transition-all cursor-pointer active:scale-95"
              >
                Close
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}