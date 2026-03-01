import Image from "next/image";
import SearchBar from "./SearchBar"; // Ensure the import path points to where you saved it

const Hero = () => {
  return (
    <div className="px-4 py-8 flex flex-col items-center gap-8">
      
      {/* 1. Reusable Search Bar Component */}
      <div className="w-full flex justify-center z-50">
        <SearchBar />
      </div>

      <div className="text-secondary mx-auto font-bold text-2xl md:text-4xl text-center">
        <span>Building Your Bridge To The World With SiM Claire</span>
      </div>

      {/* 2. Hero Image Container */}
      <div className="w-full max-w-[1400px] mx-auto relative rounded-2xl overflow-hidden shadow-md group">
        
        {/* Aspect Ratio Wrapper for Image */}
        <div className="w-full aspect-video md:h-[700px] relative">
            <Image
            src="https://res.cloudinary.com/dyalxye1e/image/upload/v1771183237/blue_gradient_travel_Presentation_169_2_ahomt2.png"
            alt="Hero Image"
            fill
            priority
            className="object-cover"
            />
        </div>

        {/* --- DESKTOP Buttons (Overlay) --- */}
        <div className="hidden md:flex absolute top-54 right-10 gap-4 z-10">
          <AppStoreButtons />
        </div>
      </div>

      {/* --- MOBILE Buttons (Below Image) --- */}
      <div className="flex md:hidden gap-4 justify-center w-full">
         <AppStoreButtons />
      </div>

    </div>
  );
};

// Extracted Buttons to avoid code duplication
const AppStoreButtons = () => (
  <>
    {/* Apple App Store Button */}
    <a href="#" className="hover:scale-105 transition-transform duration-300">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
        alt="Download on the App Store"
        width={0}
        height={0}
        sizes="100vw"
        className="h-10 md:h-12 w-auto drop-shadow-lg"
      />
    </a>

    {/* Google Play Store Button */}
    <a href="#" className="hover:scale-105 transition-transform duration-300">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
        alt="Get it on Google Play"
        width={0}
        height={0}
        sizes="100vw"
        className="h-10 md:h-12 w-auto drop-shadow-lg"
      />
    </a>
  </>
);

export default Hero;