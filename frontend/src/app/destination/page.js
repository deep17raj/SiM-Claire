import Image from "next/image";
import Link from "next/link";

const popularDestinations = [
  { code: "au", name: "Australia", price: "₹299.00" },
  { code: "az", name: "Azerbaijan", price: "₹499.00" },
  { code: "ca", name: "Canada", price: "₹399.00" },
  { code: "cn", name: "China", price: "₹299.00" },
  { code: "fr", name: "France", price: "₹299.00" },
  { code: "de", name: "Germany", price: "₹299.00" },
  { code: "id", name: "Indonesia", price: "₹299.00" },
  { code: "jp", name: "Japan", price: "₹299.00" },
  { code: "my", name: "Malaysia", price: "₹299.00" },
  { code: "ph", name: "Philippines", price: "₹299.00" }, // Highlighted in your example
  { code: "qa", name: "Qatar", price: "₹299.00" },
  { code: "sg", name: "Singapore", price: "₹299.00" },
  { code: "lk", name: "Sri Lanka", price: "₹299.00" },
  { code: "ch", name: "Switzerland", price: "₹299.00" },
  { code: "th", name: "Thailand", price: "₹299.00" },
  { code: "tr", name: "Turkey", price: "₹299.00" },
];

const HeroSearch = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-12 md:py-16">
      
      {/* 1. NEW HEADER & SEARCH SECTION */}
      <div className="flex flex-col items-center mb-16 space-y-8 text-center">
        
        {/* The New Header Title */}
        <h1 className="text-2xl md:text-4xl font-bold hcol leading-tight">
          Planning a trip? Check our rates <br className="hidden md:block" />
          <span className="text-brand">for your destination.</span>
        </h1>

        {/* Search Bar Container */}
        <div className="w-full max-w-2xl relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            {/* Search Icon SVG */}
            <svg className="text-brand w-6 h-6 group-focus-within:text-brand transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input 
            type="text"
            className="w-full pl-14 pr-6 py-4 bg-white border border-brand rounded-full  shadow-brand/30 shadow-[0_0_25px_rgba(236,91,19,0.25)] outline-none text-lg transition-all focus:ring-2 focus:ring-brand focus:border-transparent placeholder:text-gray-400" 
            placeholder="Search for a country or region..." 
          />
        </div>

        {/* Tabs (Country / Region / Global) */}
        <div className="flex bg-gray-100 p-1.5 rounded-full border border-gray-200">
          <button className="px-8 py-2 rounded-full bg-white shadow-sm text-brand font-bold text-sm transition-all">
            Country
          </button>
          <button className="px-8 py-2 rounded-full text-secondary font-medium text-sm hover:text-gray-800 transition-all">
            Region
          </button>
          <button className="px-8 py-2 rounded-full text-secondary font-medium text-sm hover:text-gray-800 transition-all">
            Global
          </button>
        </div>
      </div>

      {/* 2. POPULAR DESTINATIONS GRID */}
      <div className="mb-10 text-center sm:text-left">
        <h2 className="text-2xl md:text-4xl font-bold hcol mb-2">Popular Destinations</h2>
        <p className=" subheading text-gray-500">Choose a country to see available eSIM plans for your next trip.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {popularDestinations.map((country) => (
          <Link 
            key={country.code} 
            href={`/esim/${country.code}`}
            className="flex items-center p-3 sm:p-4 rounded-full bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-md transition-all group"
          >
            {/* Flag Circle */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-gray-100">
              <Image 
                src={`https://flagcdn.com/w80/${country.code}.png`}
                alt={`Flag of ${country.name}`}
                fill
                className="object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="ml-4 flex-grow">
              <p className="font-medium subheading text-gray-900">{country.name}</p>
              <p className="desc">
                From <span className="font-medium text-gray-900">{country.price}</span>
              </p>
            </div>

            {/* Chevron Icon */}
            <div className="text-gray-300 group-hover:text-brand transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* 3. VIEW ALL BUTTON */}
      <div className="mt-16 text-center">
        <button className="text-brand text-lg md:text-xl border-brand border-2 rounded-lg px-14 py-4 font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 transition-all duration-300 cursor-pointer">
            View All 150+ Countries
        </button>
      </div>

    </section>
  );
};

export default HeroSearch;