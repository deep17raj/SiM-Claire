import Image from "next/image";
import Link from "next/link"; // Imported Link for routing

// Sample data for the cards to keep the JSX clean and scalable
const destinations = [
  {
    id: "au",
    destinationID: "AU-1",
    name: "Australia",
    price: "₹299.00",
    bgImg: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=3330&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Sydney
    flag: "https://flagcdn.com/w40/au.png",
  },
  {
    id: "az",
    destinationID: "AZ-1",
    name: "Azerbaijan",
    price: "₹499.00",
    bgImg: "https://images.unsplash.com/photo-1596306499398-8d88944a5ec4?q=80&w=3212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Baku
    flag: "https://flagcdn.com/w40/az.png",
  },
  {
    // Replaced Canada with United States
    id: "us",
    destinationID: "USA-1", 
    name: "United States",
    price: "₹399.00",
    bgImg: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop", // New York
    flag: "https://flagcdn.com/w40/us.png",
  },
  {
    id: "cn",
    destinationID: "CN-1",
    name: "China",
    price: "₹299.00",
    bgImg: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=800&auto=format&fit=crop", // Great Wall
    flag: "https://flagcdn.com/w40/cn.png",
  },
  {
    id: "fr",
    destinationID: "FR-1",
    name: "France",
    price: "₹299.00",
    bgImg: "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=800&auto=format&fit=crop", // Paris
    flag: "https://flagcdn.com/w40/fr.png",
  },
  {
    id: "de",
    destinationID: "DE-1",
    name: "Germany",
    price: "₹299.00",
    bgImg: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=800&auto=format&fit=crop", // Berlin
    flag: "https://flagcdn.com/w40/de.png",
  },
  {
    id: "id",
    destinationID: "ID-1",
    name: "Indonesia",
    price: "₹299.00",
    bgImg: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop", // Bali
    flag: "https://flagcdn.com/w40/id.png",
  },
  {
    id: "jp",
    destinationID: "JYN-1",
    name: "Japan",
    price: "₹299.00",
    bgImg: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop", // Kyoto
    flag: "https://flagcdn.com/w40/jp.png",
  },
];

const Destinations = () => {
  return (
    <section className="w-full max-w-350 mx-auto px-4 py-10 md:py-14">
      
      {/* 1. Header Section (Tabs removed) */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
          Travel eSIM for <span className="text-brand font-bold">150+</span> countries
        </h2>
      </div>

      {/* 2. Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {destinations.map((dest) => (
          // Changed div to Link to enable routing using the destinationID
          <Link 
            href={`/destination/${dest.destinationID}`}
            key={dest.id} 
            className="relative block h-48 md:h-56 rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow"
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
                <div className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-brand group-hover:border-0 group-hover:text-tertary transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
      
      <div className="flex justify-center items-center mt-8">
        {/* <linK href="/destination">
        <button className="text-brand text-lg md:text-xl border-brand border-2 rounded-lg px-14 py-4 font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 cursor-pointer">
          View All Countries
        </button></linK> */}
        <Link 
          href="/destination"
          className="inline-block text-brand text-lg md:text-xl border-brand border-2 rounded-lg px-14 py-4 font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 cursor-pointer"
        >
          View All Countries
        </Link>
      </div>

    </section>
  );
};

export default Destinations;