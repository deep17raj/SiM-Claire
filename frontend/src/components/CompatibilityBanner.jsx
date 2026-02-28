"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { X, CheckCircle2, AlertCircle, Smartphone } from "lucide-react";

const CompatibilityBanner = () => {
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compatibility Logic States
  const [status, setStatus] = useState("idle"); // idle, checking, success, fail, need_info
  const [deviceInput, setDeviceInput] = useState("");
  const [detectedOs, setDetectedOs] = useState("");

  // 1. Auto-Detect OS when Modal Opens
  useEffect(() => {
    if (isModalOpen) {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        setDetectedOs("iPhone");
        setDeviceInput("iPhone "); // Pre-fill for convenience
      } else if (/android/i.test(userAgent)) {
        setDetectedOs("Android");
      }
    }
  }, [isModalOpen]);

  // 2. Handle the closing of the modal (resets state)
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setDeviceInput("");
    }, 300); // Wait for modal to close before resetting to avoid flicker
  };

  // 3. Send data to backend
  const checkDevice = async (deviceStringToCheck) => {
    setStatus("checking");
    try {
      // NOTE: Replace this with your actual backend endpoint
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/device/check-compatibility`, {
        "userAgent": deviceStringToCheck
      });

      if (res.data.needsMoreInfo) {
        setStatus("need_info");
      } else if (res.data.isCompatible) {
        setStatus("success");
      } else {
        setStatus("fail");
      }
    } catch (err) {
      console.error("Error checking device", err);
      // Fallback for demonstration if API isn't ready:
      // Remove this timeout block when your backend is connected!
      setTimeout(() => {
         const input = deviceStringToCheck.toLowerCase();
         if (input === "iphone" || input === "android") setStatus("need_info");
         else if (input.includes("14") || input.includes("s23")) setStatus("success");
         else setStatus("fail");
      }, 1500);
    }
  };

  // 4. Button Handlers
  const handleAutoCheck = () => {
    checkDevice(navigator.userAgent);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    checkDevice(deviceInput);
  };

  return (
    <>
      {/* --- ORIGINAL BANNER --- */}
      <section className="px-4 py-8">
        <div className="w-full max-w-350 mx-auto bg-bget rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 shadow-sm">
          
          {/* 1. Icon & First Text Block */}
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

          {/* 2. Second Text Block */}
          <div className="text-center lg:text-left w-full lg:w-auto">
            <p className="text-gray-600 text-sm">SIM Claire works with most</p>
            <p className="hcol font-bold text-lg md:text-xl">unlocked iPhone & Android models.</p>
          </div>

          <div className="hidden lg:block w-[1px] h-12 bg-gray-300"></div>
          <div className="block lg:hidden w-full h-[1px] bg-gray-200"></div>

          {/* 3. Third Text Block */}
          <div className="text-center lg:text-left w-full lg:w-auto">
            <p className="text-gray-600 text-sm">Find out if your phone</p>
            <p className="hcol font-bold text-lg md:text-xl">is eSIM compatible.</p>
          </div>

          {/* 4. Action Button (TRIGGERS MODAL) */}
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
          
          {/* Modal Container */}
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
            
            {/* Close Button */}
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

              {/* STATE 1: IDLE (Auto-Detect Button) */}
              {status === "idle" && (
                <div className="text-center">
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

              {/* STATE 2: CHECKING (Loading Spinner) */}
              {status === "checking" && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="font-medium text-gray-600">Analyzing device capabilities...</p>
                </div>
              )}

              {/* STATE 3: NEED INFO / FAIL (Manual Input Form) */}
              {(status === "need_info" || status === "fail") && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {status === "fail" && (
                    <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl mb-5 text-sm text-center flex items-center gap-2 justify-center">
                      <AlertCircle size={18} /> We couldn't verify this exact model.
                    </div>
                  )}
                  {status === "need_info" && (
                    <div className="bg-blue-50 border border-blue-100 text-blue-700 p-4 rounded-xl mb-5 text-sm text-center">
                      Looks like you are on an <b>{detectedOs}</b>! Because of Apple/Android privacy settings, please type your exact model below.
                    </div>
                  )}

                  <form onSubmit={handleManualSubmit}>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">Enter Device Model</label>
                    <input 
                      type="text" 
                      value={deviceInput}
                      onChange={(e) => setDeviceInput(e.target.value)}
                      placeholder="e.g. iPhone 14 Pro, Galaxy S23"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl mb-4 focus:ring-2 focus:ring-brand outline-none transition-all"
                      required
                    />
                    <button type="submit" className="w-full py-3.5 bg-brand text-white font-bold rounded-xl hover:bg-[#d94a0e] transition-all shadow-md shadow-brand/20 active:scale-95 cursor-pointer">
                      Verify Model
                    </button>
                  </form>
                </div>
              )}

              {/* STATE 4: SUCCESS */}
              {status === "success" && (
                <div className="text-center bg-emerald-50 p-8 rounded-2xl border border-emerald-100 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-bold text-emerald-800 text-2xl mb-2">Great news!</h3>
                  <p className="text-emerald-700">Your device is fully eSIM compatible. You are ready to travel.</p>
                  
                  <button 
                    onClick={handleCloseModal}
                    className="mt-6 w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all cursor-pointer"
                  >
                    View eSIM Plans
                  </button>
                  <button onClick={() => setStatus("idle")} className="mt-4 text-emerald-700 font-medium text-sm hover:underline cursor-pointer">
                    Check another device
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