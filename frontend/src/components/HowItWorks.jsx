import React from 'react';
import Link from "next/link";

const steps = [
  {
    id: 1,
    title: "Pick Your Plan",
    description: "Get the right plan designed for you.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <circle cx="12" cy="11" r="3" />
        <path d="M14 13l2 2" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Confirm & Pay",
    description: "Make the payment to complete your purchase.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
        <path d="M16 15l-4 4-2-2" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Complete KYC",
    description: "Upload your documents to stay compliant.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Activate eSIM",
    description: "Scan the QR code and activate your eSIM.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
        <line x1="12" y1="20" x2="12.01" y2="20"></line>
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-[#fcfcfc]">
      <div className="w-full max-w-[1200px] mx-auto">
        
        {/* Main Header */}
        <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-secondary uppercase tracking-wide mb-2 md:mb-3">
                How It Works
            </h2>
            <p className="text-lg md:text-xl text-gray-500 font-normal">
                Global connectivity unlocked in 4 simple steps
            </p>
        </div>

        {/* Grid Layout:
            - grid-cols-2: Mobile (2 columns, 2 rows = 2x2)
            - md:grid-cols-4: Desktop (4 columns, 1 row = 1x4)
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          
          {steps.map((step, index) => (
            <div 
                key={step.id} 
                /* Card Sizing:
                   - p-5: Reduced padding on mobile to fit 2 cols
                   - md:p-8: Larger padding on desktop
                   - min-h-[...]: Ensures uniform height
                */
                className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-3 md:p-5 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 relative hover:shadow-lg transition-shadow duration-300 min-h-[180px] md:min-h-[250px]"
            >
                
                {/* Number Badge (Top Left) */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 w-8 h-8 md:w-10 md:h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg shadow-md">
                    {index + 1}
                </div>

                {/* Icon Area */}
                <div className="mb-4 md:mb-8 text-secondary opacity-90 p-3 md:p-4 bg-green-50 rounded-2xl md:rounded-3xl mt-4 md:mt-0">
                    {/* Scale SVG down slightly on mobile via CSS class if needed, or rely on viewBox */}
                    <div className="scale-75 md:scale-100">
                         {step.icon}
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-secondary font-bold text-lg md:text-xl  tracking-normal ">
                    {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm md:text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                </p>
            </div>
          ))}
          
        </div>

        {/* Support Link */}
        <div className="mt-12 md:mt-16 text-center">
            <p className="text-gray-500 text-lg md:text-xl mb-4">
               Stuck somewhere? Go to our support page for FAQs.
            </p>
            <Link href="/support">
                <button className="text-brand text-lg md:text-xl border-brand border-2 rounded-lg px-14 py-4 font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 transition-all duration-300 cursor-pointer  ">
                    Get Support
                </button>
            </Link>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;