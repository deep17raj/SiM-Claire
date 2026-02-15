import Link from "next/link";
import CompatibilityChecker from "./CompatibilityChecker";

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 px-4 md:px-12 lg:px-24 overflow-hidden bg-[#fffaf7] text-slate-900">
      
      <div className="max-w-6xl mx-auto relative">
        
        {/* 1. The Floating Bubbles & Title Section */}
        {/* We use a min-height container to give the bubbles space to 'float' around the text */}
        <div className="relative w-full min-h-[500px] flex items-center justify-center">
          
          {/* Background Soft Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(242,103,28,0.1)_0%,transparent_70%)]"></div>

          {/* Central Title */}
          <div className="relative z-10 text-center px-4 max-w-xl">
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">
              Why Travelers Trust <span className="text-brand">SiM Claire</span>
            </h2>
          </div>

          {/* Bubble 1: Local Rates (Top Left) */}
         <div className="absolute top-0 left-[5%] md:left-[10%] w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-secondary to-[#3ac2b8] shadow-2xl shadow-[#077770]/30 flex flex-col items-center justify-center text-white p-6 text-center hover:scale-105 transition-transform duration-300 -translate-y-12 md:translate-y-0">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="mb-2 opacity-90">
    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
  <h3 className="font-semibold text-lg md:text-xl">Local Rates</h3>
  <p className="text-xs mt-1 opacity-90 hidden md:block">Say goodbye to expensive markup prices</p>
</div>

          {/* Bubble 2: Global Coverage (Bottom Left) */}
          <div className="absolute bottom-0 left-[2%] md:left-[5%] w-36 h-36 md:w-48 md:h-48 rounded-full bg-white border-2 border-brand/20 shadow-xl flex flex-col items-center justify-center text-slate-800 p-4 text-center hover:scale-105 transition-transform duration-300 translate-y-12 md:translate-y-0">
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f2671c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
             </svg>
             <h3 className="font-semibold text-base md:text-lg">Global Coverage</h3>
             <p className="text-xs mt-1 text-slate-500 hidden md:block">Connect in 190+ countries</p>
          </div>

          {/* Bubble 3: No Roaming (Top Right) */}
          <div className="absolute top-[5%] right-[2%] md:right-[5%] w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-secondary to-[#3ac2b8] shadow-2xl shadow-[#077770]/30 flex flex-col items-center justify-center text-white p-6 text-center hover:scale-105 transition-transform duration-300 -translate-y-8 md:translate-y-0">
  {/* Better Icon: Full Signal Strength */}
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="mb-2 opacity-90">
     <path d="M2 22h20V2z" /> 
  </svg>
  <h3 className="font-semibold text-lg md:text-xl">No Roaming</h3>
  <p className="text-xs mt-1 opacity-90 hidden md:block">Zero surprises on your next bill</p>
</div>

          {/* Bubble 4: 24/7 Support (Bottom Right) */}
          <div className="absolute bottom-[5%] right-[5%] md:right-[10%] w-32 h-32 md:w-44 md:h-44 rounded-full bg-white border-2 border-brand/20 shadow-xl flex flex-col items-center justify-center text-slate-800 p-4 text-center hover:scale-105 transition-transform duration-300 translate-y-8 md:translate-y-0">
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f2671c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
               <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
             </svg>
             <h3 className="font-semibold text-base md:text-lg">24/7 Support</h3>
             <p className="text-xs mt-1 text-slate-500 hidden md:block">Help whenever you need it</p>
          </div>

        </div>

        {/* 2. Text Content & Links (Replaced buttons with Next.js Links) */}
        <div className="mt-16 text-center max-w-3xl mx-auto px-4">
          <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed">
             We believe that staying connected shouldn't be a luxury or a headache. 
             <span className="font-semibold text-brand"> SiM Claire </span> 
             bridges the gap between premium global connectivity and local affordability. 
             By utilizing cutting-edge eSIM technology, we eliminate the need for physical SIM cards, hidden roaming fees, and the stress of finding Wi-Fi.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Action */}
            <Link href="/destination" className="w-full sm:w-auto bg-brand hover:bg-[#e05610] text-white px-10 py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-brand/20 hover:shadow-brand/40 active:scale-95 text-center cursor-pointer">
               Start Your Journey
            </Link>
            
            {/* Secondary Action */}
            <Link href="/how-it-works" className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-10 py-4 rounded-full font-semibold text-lg transition-all hover:bg-slate-50 text-center cursor-pointer">
               How it Works
            </Link>
          </div>
        </div>

      </div>
      <CompatibilityChecker/>
    </section>
  );
};

export default WhyChooseUs;