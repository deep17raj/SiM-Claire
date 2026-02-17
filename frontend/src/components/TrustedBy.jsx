import Image from "next/image";

// Data array
const partners = [
  {
    id: "visa",
    name: "Visa",
    src: "/visa.jpg",
    width: 140,
    hasWhiteBox: true,
  },
  {
    id: "master",
    name: "Master Card",
    src: "/master3.png",
    width: 140,
    hasWhiteBox: true,
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
    <div className="px-4 py-8">
      
      <section className="w-full max-w-350 mx-auto bg-bget rounded-2xl py-6 md:py-10">
        
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary text-center mb-10 md:mb-14">
          Trusted by
        </h2>

        {/* --- MOBILE VIEW: Static Grid (Animation Removed) --- */}
        <div className="md:hidden w-full">
          {/* Changed to flex-wrap so logos sit nicely on screen without moving */}
          <div className="flex flex-wrap justify-center gap-8 px-4">
            {partners.map((partner) => (
              <PartnerCard key={`m1-${partner.id}`} partner={partner} />
            ))}
          </div>
        </div>

        {/* --- DESKTOP VIEW: Static Grid (Your Original Layout) --- */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-20">
          {partners.map((partner) => (
            <div 
              key={partner.id}
              className="transition-transform hover:scale-105"
            >
              <PartnerCard partner={partner} />
            </div>
          ))}
        </div>

      </section>
    </div>
  );
};

// Extracted Card Component to avoid code repetition
const PartnerCard = ({ partner }) => {
  return (
    <div
      className={`flex items-center justify-center shrink-0 ${
        partner.hasWhiteBox
          ? "bg-white rounded-2xl shadow-sm px-6 py-4"
          : ""
      }`}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: partner.width, height: "48px" }}
      >
        <Image
          src={partner.src}
          alt={`${partner.name} logo`}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default TrustedBy;