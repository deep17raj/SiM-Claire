import Image from "next/image";
const CompatibilityBanner = () => {
  return (
    <section className=" px-4 py-8">
      {/* The main container: 
        - Light gray background
        - Rounded corners
        - Flexbox for responsive stacking
      */}
      <div className=" w-full max-w-350 mx-auto bg-bget rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 shadow-sm">
        
        {/* 1. Icon & First Text Block */}
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 w-full md:w-auto">
          
          {/* Phone Icon Box (Using your custom orange color) */}
          <div className="w-20 h-24 bg-tertary rounded-xl flex flex-col items-center justify-center shrink-0 relative shadow-sm">
            {/* Checkmark */}
            {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg> */}
            <Image
                      src="/simCompat2.png"
                      alt="Hero Image"
                      fill
                      priority
                      className="object-cover"
                    />
            {/* Bottom line of the phone */}
            <div className="w-4 h-1 bg-white rounded-full absolute bottom-2"></div>
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

        {/* Vertical Divider (Hidden on mobile/tablet, visible on desktop) */}
        <div className="hidden lg:block w-[1px] h-12 bg-gray-300"></div>

        {/* Mobile Horizontal Divider (Visible on mobile, hidden on desktop) */}
        <div className="block lg:hidden w-full h-[1px] bg-gray-200"></div>

        {/* 3. Third Text Block */}
        <div className="text-center lg:text-left w-full lg:w-auto">
          <p className="text-gray-600 text-sm">Find out if your phone</p>
          <p className="hcol font-bold text-lg md:text-xl">is eSIM compatible.</p>
        </div>

        {/* 4. Action Button */}
        <div className="w-full lg:w-auto flex flex-col items-center lg:items-end shrink-0">
          <button className="px-6 py-2.5 text-brand text-lg md:text-xl border-brand border-2 rounded-lg font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 transition-all duration-300 cursor-pointer ">
            Check Compatibility
          </button>
          {/* Added the subtext from the image (fixing the 'yif' typo to 'if') */}
          <p className="text-sm text-gray-500 mt-2 italic">
            Quickly see if the device is supported
          </p>
        </div>

      </div>
    </section>
  );
};

export default CompatibilityBanner;