import React from 'react';
import Link from "next/link";

const steps = [
  // ... (Your steps array remains the same)
  {
    id: 1,
    title: "PICK YOUR PLAN",
    description: "Find the perfect data plan for your journey",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <circle cx="12" cy="11" r="3" />
        <path d="M14 13l2 2" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "SCAN & ACTIVATE",
    description: "Instantly install your digital eSIM",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
        <rect x="9" y="7" width="2" height="2" />
        <rect x="13" y="7" width="2" height="2" />
        <rect x="9" y="11" width="2" height="2" />
        <rect x="13" y="11" width="2" height="2" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "CONNECT & EXPLORE",
    description: "Enjoy seamless data connection, globally!",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <rect x="16" y="10" width="6" height="10" rx="1" />
        <path d="M19 13a2 2 0 0 1 2-2" />
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 ">
      {/* px-0 on mobile to allow full-width scrolling, px-4 on md+ */}
      <div className="w-full max-w-[1400px] mx-auto bg-bget rounded-2xl px-0 md:px-4">
        
        {/* Header Section */}
        <div className="flex flex-col justify-center items-center mb-12 text-center md:text-left px-4">
            <h2 className="text-4xl font-bold text-secondary mb-3">
                How it Works
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
                Global connectivity – unlocked in 3 simple steps.
            </p>
        </div>

        {/* Steps Container 
            - overflow-x-auto: Enables horizontal scroll
            - snap-x: Enables snapping behavior
            - pb-8: Bottom padding for scrollbar space
            - no-scrollbar: Optional utility to hide scrollbar if you have it in your CSS
        */}
        <div className="flex flex-row md:items-center justify-between gap-6 overflow-x-auto snap-x snap-mandatory px-4 md:px-0 pb-8 md:pb-0 scroll-smooth">
          
          {steps.map((step, index) => (
           <React.Fragment key={step.id}>
    
    {/* Step Card 
        - min-w-[85vw]: ensures proper width on mobile scroll
        - flex-1: allows equal spacing on desktop
    */}
    <div className="min-w-[65vw] md:min-w-0 md:flex-1 h-full min-h-[200px] border-[3px] border-secondary rounded-[32px] p-8 flex flex-col items-center text-center bg-white transition-transform  duration-300 snap-center flex-shrink-0 shadow-sm hover:shadow-xl">
        
        {/* Icon Box */}
        <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            {step.icon}
        </div>

        {/* Content */}
        <h3 className="text-brand font-bold text-lg uppercase tracking-wider mb-3">
            {step.title}
        </h3>
        <p className="text-gray-600 text-[15px] leading-relaxed font-medium px-2">
            {step.description}
        </p>
    </div>

    {/* Arrow Icon (Rendered between steps, hidden on mobile) */}
    {index < steps.length - 1 && (
        <div className="hidden md:flex flex-shrink-0 text-secondary/30 items-center justify-center px-2">
            {/* New Arrow: A bold Chevron */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        </div>
    )}

</React.Fragment>
          ))}
          
        </div>

        {/* Support Link */}
        <div className="mt-8 md:mt-16 text-center px-4 py-2">
            <p className="text-gray-600 text-lg mb-4">
               Stuck somewhere? Go to our support page for FAQs and troubleshooting.
            </p>
            <Link href="/support" className=''>
                <button className="text-brand border-brand border-2 rounded-lg px-14 py-4 font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 transition-all duration-300 cursor-pointer">Get Support</button>
            </Link>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;