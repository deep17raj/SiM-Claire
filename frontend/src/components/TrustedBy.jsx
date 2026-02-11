import Image from "next/image";

// Data array makes it easy to add or remove partners later
const partners = [
  {
    id: "visa",
    name: "Visa",
    src: "/visa.jpg", // Path to your public folder
    width: 140,
    hasWhiteBox: true,
  },
  {
    id: "master",
    name: "Master Card",
    src: "/mastercard.png",
    width: 140,
    hasWhiteBox: true, // This will wrap it in the white card
  },
  {
    id: "apple",
    name: "Apple Pay",
    src: "/apple.png",
    width: 140,
    hasWhiteBox: true,
  },
  {
    id: "google",
    name: "Google Pay",
    src: "/gpay2.png",
    width: 140,
    hasWhiteBox: true,
  },
];

const TrustedBy = () => {
  return (
    // The background color matches the light gray in your image
    <section className="w-full max-w-350 mx-auto   bg-[#f3f4f6] rounded-2xl py-6 md:py-10">
      
        
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#2d3240] text-center mb-10 md:mb-14">
          Trusted by
        </h2>

        {/* Logos Container */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-20">
          {partners.map((partner) => (
            <div 
              key={partner.id}
              className={`flex items-center justify-center transition-transform hover:scale-105 ${
                partner.hasWhiteBox 
                  ? "bg-white rounded-2xl shadow-sm px-6 py-4" 
                  : ""
              }`}
            >
              {/* Image Wrapper for Next.js Image component */}
              <div 
                className="relative flex items-center justify-center" 
                style={{ width: partner.width, height: "48px" }}
              >
                {/* Note: Until you add the actual images to your public folder, 
                  these will show as broken image icons. 
                */}
                <Image
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

      
    </section>
  );
};

export default TrustedBy;