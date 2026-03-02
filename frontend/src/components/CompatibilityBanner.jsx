"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { X, CheckCircle2, Smartphone, XCircle, Info } from "lucide-react";

const CompatibilityBanner = () => {
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compatibility Logic States
  const [status, setStatus] = useState("idle"); // idle, checking, success, verify, fail

  // 1. Handle the closing of the modal (resets state)
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setStatus("idle");
    }, 300); // Wait for modal to close before resetting to avoid flicker
  };

  // 2. Auto-Check Logic (Sends User-Agent to Backend)
  const handleAutoCheck = async () => {
    setStatus("checking");

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/device/check-compatibility`, {
        "userAgent": navigator.userAgent
      });
      console.log(res.data)
      console.log(navigator)
      console.log(navigator.userAgent)
      const apiData = res.data.data || res.data;

      // 🌟 STRICT LOGIC BASED ON CONFIDENCE 🌟
      if (apiData.confidence === "high" && apiData.requires_manual_selection === false) {
        // High Confidence -> Full Success
        setStatus("success");
      
      } else if (apiData.confidence === "medium") {
        // Medium Confidence -> Show compatible but verify
        setStatus("verify");
      
      } else {
        // Low Confidence (or any other edge case) -> Not Compatible
        setStatus("fail");
      }

    } catch (err) {
      console.error("Error checking device", err);
      // If API fails or errors out, default to fail state
      setStatus("fail");
    }
  };

  return (
    <>
      {/* --- ORIGINAL BANNER --- */}
      <section className="px-4 py-8">
        <div className="w-full max-w-350 mx-auto bg-bget rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 shadow-sm">
          
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 w-full md:w-auto">
            <div className="w-20 h-24 bg-tertary rounded-xl flex flex-col items-center justify-center shrink-0 relative shadow-sm overflow-hidden">
              <Image src="/simCompat2.png" alt="Hero Image" fill priority className="object-cover" />
              <div className="w-4 h-1 bg-white rounded-full absolute bottom-2 z-10"></div>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Is your device</p>
              <p className="hcol font-bold text-lg md:text-xl">Ready?</p>
            </div>
          </div>

          <div className="text-center lg:text-left w-full lg:w-auto">
            <p className="text-gray-600 text-sm">SIM Claire works with most</p>
            <p className="hcol font-bold text-lg md:text-xl">unlocked iPhone & Android models.</p>
          </div>

          <div className="hidden lg:block w-[1px] h-12 bg-gray-300"></div>
          <div className="block lg:hidden w-full h-[1px] bg-gray-200"></div>

          <div className="text-center lg:text-left w-full lg:w-auto">
            <p className="text-gray-600 text-sm">Find out if your phone</p>
            <p className="hcol font-bold text-lg md:text-xl">is eSIM compatible.</p>
          </div>

          <div className="w-full lg:w-auto flex flex-col items-center lg:items-end shrink-0">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 text-brand text-lg md:text-xl border-brand border-2 rounded-lg font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 cursor-pointer"
            >
              Check Compatibility
            </button>
            <p className="text-sm text-gray-500 mt-2 italic">
              Quickly see if the device is supported
            </p>
          </div>

        </div>
      </section>

      {/* --- MODAL OVERLAY --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
            
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full transition-colors z-10 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Device Compatibility
              </h2>

              {/* STATE 1: IDLE */}
              {status === "idle" && (
                <div className="text-center animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone size={32} />
                  </div>
                  <p className="text-gray-500 mb-6">Let's check if the device you are currently using supports eSIM technology.</p>
                  <button 
                    onClick={handleAutoCheck}
                    className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all cursor-pointer shadow-md active:scale-95"
                  >
                    Auto-Detect My Device
                  </button>
                  <div className="mt-6 text-sm text-gray-400">
                    Or dial <span className="font-bold text-gray-600">*#06#</span> on your phone. If you see an "EID" number, you are compatible!
                  </div>
                </div>
              )}

              {/* STATE 2: CHECKING */}
              {status === "checking" && (
                <div className="text-center py-8 animate-in fade-in duration-300">
                  <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="font-medium text-gray-600">Analyzing device capabilities...</p>
                </div>
              )}

              {/* STATE 3: SUCCESS (HIGH CONFIDENCE) */}
              {status === "success" && (
                <div className="text-center bg-emerald-50 p-8 rounded-2xl border border-emerald-100 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-bold text-emerald-800 text-2xl mb-2">Great news!</h3>
                  <p className="text-emerald-700 font-medium">Your device is fully eSIM compatible. You are ready to travel.</p>
                  
                  <button 
                    onClick={handleCloseModal}
                    className="mt-6 w-full py-3.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all cursor-pointer shadow-md active:scale-95"
                  >
                    Close
                  </button>
                </div>
              )}

              {/* 🌟 STATE 4: VERIFY (MEDIUM CONFIDENCE) 🌟 */}
              {status === "verify" && (
                <div className="text-center bg-orange-50 p-6 md:p-8 rounded-2xl border border-orange-200 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Info size={36} />
                  </div>
                  <h3 className="font-bold text-orange-800 text-2xl mb-2">Device is Compatible!</h3>
                  <p className="text-orange-700 font-medium mb-5 text-sm md:text-base">
                    Your phone model supports eSIM, but to be 100% certain it is unlocked by your carrier, please verify it manually.
                  </p>
                  
                  <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm text-sm text-orange-900 font-medium">
                    Dial <span className="font-bold text-lg px-1">*#06#</span> on your phone.<br/>
                    If you see an <span className="font-extrabold text-black">EID</span> number on the screen, your device is ready!
                  </div>

                  <button 
                    onClick={handleCloseModal}
                    className="mt-6 w-full py-3.5 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all cursor-pointer shadow-md active:scale-95"
                  >
                    Okay, I will check
                  </button>
                </div>
              )}

              {/* STATE 5: FAIL (LOW CONFIDENCE) */}
              {status === "fail" && (
                <div className="text-center bg-red-50 p-8 rounded-2xl border border-red-100 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle size={36} />
                  </div>
                  <h3 className="font-bold text-red-800 text-2xl mb-2">Not Compatible</h3>
                  <p className="text-red-700 font-medium">Sorry, it looks like this device does not support eSIM technology.</p>
                  
                  <button 
                    onClick={handleCloseModal} 
                    className="mt-6 w-full py-3.5 bg-white border-2 border-red-200 text-red-700 font-bold rounded-xl hover:bg-red-100 transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    Close
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompatibilityBanner;