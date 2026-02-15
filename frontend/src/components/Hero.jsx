import Image from "next/image";

const Hero = () => {
  return (
    <div className="px-4 py-8 flex flex-col items-center gap-8">
      
      {/* 1. Search Bar (Now placed ABOVE the image) */}
      <div className="relative w-full max-w-xl z-20">
        <input
          id="dest"
          name="dest"
          type="text"
          placeholder="Search destination"
          className="w-full bg-white pl-12 pr-6 py-4 border-4 border-brand rounded-full text-black text-lg outline-none shadow-lg placeholder-gray-500 transition-all focus:scale-[1.02]"
        />

        {/* Search Icon */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-brand)" // Uses your custom CSS variable
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      {/* 2. Hero Image Container */}
      {/* <div className="w-full max-w-[1400px] mx-auto aspect-video md:h-[700px] relative rounded-2xl overflow-hidden shadow-md">
        <Image
          src="https://res.cloudinary.com/dw1nrygug/image/upload/v1771090065/hero1_h3bhrb.png"
          alt="Hero Image"
          fill
          priority
          className="object-cover"
        />
      </div> */}
      <div className="text-secondary  mx-auto font-bold text-2xl md:text-4xl "><span>Building Your Bridge To The world With Sim Claire</span></div>
      <div className="w-full max-w-[1400px] mx-auto aspect-video md:h-[700px] relative rounded-2xl overflow-hidden shadow-md">
        <Image
          src="https://res.cloudinary.com/dyalxye1e/image/upload/v1771129381/blue_gradient_travel_Presentation_169_gemvqk.png"
          alt="Hero Image"
          fill
          priority
          className="object-cover"
        />
      </div>

    </div>
  );
};

export default Hero;