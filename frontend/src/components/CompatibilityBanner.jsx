"use client";

import Image from "next/image";
import { useState } from "react";
import DeviceCompatibilityModal from "./DeviceCompatibilityModal"; // Adjust path as needed

const CompatibilityBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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

      {/* Render the reusable modal */}
      <DeviceCompatibilityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default CompatibilityBanner;