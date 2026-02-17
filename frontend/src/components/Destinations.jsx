import Image from "next/image";

// Sample data for the cards to keep the JSX clean and scalable
const destinations = [
  {
    id: "au",
    name: "Australia",
    price: "₹299.00",
    bgImg: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=3330&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Sydney
    flag: "https://flagcdn.com/w40/au.png",
  },
  {
    id: "az",
    name: "Azerbaijan",
    price: "₹499.00",
    bgImg: "https://images.unsplash.com/photo-1596306499398-8d88944a5ec4?q=80&w=3212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Baku
    flag: "https://flagcdn.com/w40/az.png",
  },
  {
    id: "ca",
    name: "Canada",
    price: "₹399.00",
    bgImg: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=800&auto=format&fit=crop", // Canada nature
    flag: "https://flagcdn.com/w40/ca.png",
  },
  {
    id: "cn",
    name: "China",
    price: "₹299.00",
    bgImg: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=800&auto=format&fit=crop", // Great Wall
    flag: "https://flagcdn.com/w40/cn.png",
  },
  {
    id: "fr",
    name: "France",
    price: "₹299.00",
    bgImg: "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=800&auto=format&fit=crop", // Paris
    flag: "https://flagcdn.com/w40/fr.png",
  },
  {
    id: "de",
    name: "Germany",
    price: "₹299.00",
    bgImg: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=800&auto=format&fit=crop", // Berlin
    flag: "https://flagcdn.com/w40/de.png",
  },
  {
    id: "id",
    name: "Indonesia",
    price: "₹299.00",
    bgImg: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop", // Bali
    flag: "https://flagcdn.com/w40/id.png",
  },
  {
    id: "jp",
    name: "Japan",
    price: "₹299.00",
    bgImg: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop", // Kyoto
    flag: "https://flagcdn.com/w40/jp.png",
  },
];

const Destinations = () => {
  return (
    <section className="w-full max-w-350 mx-auto px-4 py-10 md:py-14">
      
      {/* 1. Header Section */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
          {/* Changed text-purple-600 to text-brand */}
          Travel eSIM for <span className="text-brand font-bold">200+</span> countries
        </h2>

        {/* 2. Tabs / Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Active Tab */}
          {/* Changed bg-purple-600 to bg-brand */}
          <button className="flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-full text-sm font-medium transition-transform active:scale-95 cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
              <line x1="4" y1="22" x2="4" y2="15"></line>
            </svg>
            Country
          </button>

          {/* Inactive Tab */}
          <button className="flex items-center gap-2 bg-gray-100 text-secondary hover:bg-gray-200 px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
            Region
          </button>

          {/* Inactive Tab */}
          <button className="flex items-center gap-2 bg-gray-100 text-secondary hover:bg-gray-200 px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            Global
          </button>
        </div>
      </div>

      {/* 3. Grid Section (Mobile First) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {destinations.map((dest) => (
          <div 
            key={dest.id} 
            className="relative h-48 md:h-56 rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Background Image */}
            <Image
              src={dest.bgImg}
              alt={`${dest.name} background`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />

            {/* Bottom Dark Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

            {/* Content Wrapper */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              
              {/* Flag Icon */}
              <div className="relative w-8 h-6 rounded overflow-hidden shadow-sm">
                <Image
                  src={dest.flag}
                  alt={`${dest.name} flag`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Info Row */}
              <div className="flex items-end justify-between w-full">
                <div>
                  <h3 className="text-white font-semibold text-lg md:text-xl tracking-wide">
                    {dest.name}
                  </h3>
                  <p className="text-gray-300 text-sm mt-0.5">
                    From {dest.price}
                  </p>
                </div>

                {/* Arrow Button */}
                <div className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-brand group-hover:text-tertary transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
      <div className=" flex justify-center  items-center mt-8  ">
        <button className="text-brand text-lg md:text-xl border-brand border-2 rounded-lg px-14 py-4 font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 transition-all duration-300 cursor-pointer">View All Countries</button>
      </div>

    </section>
  );
};

export default Destinations;