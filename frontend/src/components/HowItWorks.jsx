import Link from "next/link";

const steps = [
  {
    id: 1,
    title: "1. Find your perfect plan",
    description: "Get the right plan designed for you.",
    // Map & Location Icon
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
        <line x1="9" y1="3" x2="9" y2="18"></line>
        <line x1="15" y1="6" x2="15" y2="21"></line>
        <circle cx="12" cy="10" r="3" fill="currentColor" stroke="none"></circle>
      </svg>
    ),
  },
  {
    id: 2,
    title: "2. Confirm & pay",
    description: "Make the payment to complete your purchase.",
    // Mobile Payment Icon
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
        <path d="M9 7h6"></path>
        <path d="M9 11h6"></path>
        <path d="M16 15l-4 4-2-2"></path>
      </svg>
    ),
  },
  {
    id: 3,
    title: "3. Complete KYC",
    description: "Upload your documents to stay compliant with Government of India guidelines.",
    // SIM Card Icon
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2z"></path>
        <line x1="8" y1="10" x2="16" y2="10"></line>
        <line x1="8" y1="14" x2="16" y2="14"></line>
        <line x1="8" y1="18" x2="12" y2="18"></line>
      </svg>
    ),
  },
  {
    id: 4,
    title: "4. Activate eSIM",
    description: "Scan the QR code and activate your eSIM.",
    // Antenna / Signal Icon
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8.52v7.15"></path>
        <path d="M20 8.52v7.15"></path>
        <path d="M8 5.48v13.19"></path>
        <path d="M16 5.48v13.19"></path>
        <path d="M12 2v20"></path>
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    // Matches the light gray background from your previous section
    <section className=" py-8 px-4">
      <div className="w-full bg-[#f3f4f6] max-w-[1400px] mx-auto rounded-2xl">
      <div className="">
        
        {/* Section Title */}
        <h2 className="pt-4 text-center text-2xl md:text-3xl lg:text-4xl font-medium text-[#2d3240] mb-8">
          Global connectivity – unlocked in 4 steps.
        </h2>

        {/* Steps Grid */}
        <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-6 mt-8">
          {steps.map((step) => (
            // Relative wrapper is crucial here so the icon can pop out of the top
            <div key={step.id} className="relative mt-8 md:mt-10">
              
              {/* Floating Icon Box */}
              <div className="absolute -top-10 left-6 w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center text-white shadow-md z-10">
                {step.icon}
              </div>

              {/* Card Content Area */}
              <div className="h-full pt-14 pb-8 px-6 border border-gray-300 rounded-2xl bg-[#f3f4f6] hover:bg-white hover:shadow-sm transition-colors duration-300">
                <h3 className="text-[#2d3240] font-bold text-[17px] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-16 pb-4  text-center flex flex-col items-center">
          <p className="text-gray-600 text-[15px] mb-5">
            Stuck somewhere? Go to our support page for FAQs and troubleshooting.
          </p>
          <Link href="/support">
            <button className="px-8 py-3 border-2 border-[#2d3240] text-[#2d3240] font-semibold text-[15px] rounded-lg hover:text-brand hover:border-brand transition-all duration-300 active:scale-95 cursor-pointer">
              Get Support
            </button>
          </Link>
        </div>

      </div>
      </div>
    </section>
  );
};

export default HowItWorks;