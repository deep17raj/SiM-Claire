const CompatibilityBanner = () => {
  return (
    <section className=" px-4 py-8">
      {/* The main container: 
        - Light gray background
        - Rounded corners
        - Flexbox for responsive stacking
      */}
      <div className=" w-full max-w-350 mx-auto bg-[#f3f4f6] rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 shadow-sm">
        
        {/* 1. Icon & First Text Block */}
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 w-full md:w-auto">
          
          {/* Phone Icon Box (Using your custom orange color) */}
          <div className="w-12 h-16 bg-secondary rounded-xl flex flex-col items-center justify-center shrink-0 relative shadow-sm">
            {/* Checkmark */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            {/* Bottom line of the phone */}
            <div className="w-4 h-1 bg-white rounded-full absolute bottom-2"></div>
          </div>

          <div>
            <p className="text-gray-600 text-[15px]">Is my device</p>
            <p className="text-[#2d3240] font-bold text-lg">eSIM Compatible?</p>
          </div>
        </div>

        {/* 2. Second Text Block */}
        <div className="text-center lg:text-left w-full lg:w-auto">
          <p className="text-gray-600 text-[15px]">SiMClaire eSIMs are compatible</p>
          <p className="text-[#2d3240] font-bold text-[15px]">with most modern devices</p>
        </div>

        {/* Vertical Divider (Hidden on mobile/tablet, visible on desktop) */}
        <div className="hidden lg:block w-[1px] h-12 bg-gray-300"></div>

        {/* Mobile Horizontal Divider (Visible on mobile, hidden on desktop) */}
        <div className="block lg:hidden w-full h-[1px] bg-gray-200"></div>

        {/* 3. Third Text Block */}
        <div className="text-center lg:text-left w-full lg:w-auto">
          <p className="text-gray-600 text-[15px]">Check your device compatibility</p>
          <p className="text-[#2d3240] font-bold text-[15px]">before purchasing your eSIM.</p>
        </div>

        {/* 4. Action Button */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end shrink-0">
          <button className="px-6 py-2.5 border-2 border-[#2d3240] text-[#2d3240] font-semibold text-[15px] cursor-pointer rounded-lg  hover:text-brand hover:border-brand  transition-all duration-300 whitespace-nowrap active:scale-95">
            Check Compatibility
          </button>
        </div>

      </div>
    </section>
  );
};

export default CompatibilityBanner;