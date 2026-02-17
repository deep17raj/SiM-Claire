"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- MOCK DATA ---
const testimonialsData = [
  {
    id: 1,
    quote: "I was skeptical about using an eSIM for the first time, but SiMClaire made it incredibly easy. I scanned the code at Heathrow airport, and my data was active before I even reached the baggage claim. No more hunting for local SIM cards!",
    name: "Samantha Johnson",
    title: "Vacationing in UK",
    avatar: "/avatars/avatar1.png", 
  },
  {
    id: 2,
    quote: "Traveling across Europe usually means hunting for Wi-Fi or buying expensive local SIMs. With SiMClaire's regional plan, I crossed from France to Italy without losing signal once. It just worked seamlessly in the background.",
    name: "Isabella Rodriguez",
    title: "Backpacking through Europe",
    avatar: "/avatars/avatar2.png",
  },
  {
    id: 3,
    quote: "As a frequent flyer, roaming charges used to kill my budget. SiMClaire is a total game-changer. I scanned the QR code before my flight to Tokyo, and had instant 5G data the moment the plane touched down.",
    name: "Gabrielle Williams",
    title: "Business Traveler",
    avatar: "/avatars/avatar3.png",
  },
  {
    id: 4,
    quote: "The data speed was impressive! I was able to FaceTime my family from a remote beach in Bali without any lag. It was much more reliable than the hotel Wi-Fi and the setup took literally seconds.",
    name: "Natalie Martinez",
    title: "Vacationing in Indonesia",
    avatar: "/avatars/avatar4.png",
  },
  {
    id: 5,
    quote: "I used to pay $10/day to my home carrier just to check emails abroad. SiMClaire gave me 10GB for a fraction of that price. It's an absolute no-brainer for anyone traveling to the USA.",
    name: "John Peter",
    title: "Frequent Flyer",
    avatar: "/avatars/avatar5.png",
  },
];

// --- SUB-COMPONENT: Single Testimonial Card ---
const TestimonialCard = ({ data }) => {
  return (
    <div className="w-[320px] md:w-[400px] p-8 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-full shrink-0 mx-3 transition-transform hover:scale-[1.02] duration-300 snap-center">
      <div>
        {/* Quote Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-secondary mb-6 opacity-50">
          <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
        </svg>
        
        {/* Quote Text */}
        <p className="hcol text-sm font-medium leading-relaxed mb-8">
          "{data.quote}"
        </p>
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
          <Image src={data.avatar} alt={data.name} fill className="object-cover" />
        </div>
        <div>
          <h4 className="hcol text-lg md:text-xl font-medium">{data.name}</h4>
          <p className="text-gray-500 text-sm">{data.title}</p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const Testimonials = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 420; // Card width + margin
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-16 bg-[#fafafa]">
      
      {/* Header */}
      <div className="w-full max-w-[1400px] mx-auto px-4 mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-secondary max-w-2xl mx-auto">
          Words of praise from others about our presence.
        </h2>
      </div>

      {/* Main Container: Flex row to hold Buttons and Track side-by-side */}
      <div className="w-full max-w-[1500px] mx-auto flex items-center justify-center gap-4 px-2 md:px-8">
        
        {/* Left Arrow (Outside) */}
        <button 
          onClick={() => scroll("left")}
          className="shrink-0 w-12 h-12 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-secondary hover:bg-brand hover:text-white transition-all duration-300 active:scale-95 cursor-pointer z-10 hidden md:flex"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Scrollable Track */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonialsData.map((item) => (
            <TestimonialCard key={item.id} data={item} />
          ))}
        </div>

        {/* Right Arrow (Outside) */}
        <button 
          onClick={() => scroll("right")}
          className="shrink-0 w-12 h-12 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-secondary hover:bg-brand hover:text-white transition-all duration-300 active:scale-95 cursor-pointer z-10 hidden md:flex"
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} />
        </button>

      </div>
      
      {/* Mobile Navigation Hint (Optional, since arrows are hidden on small screens) */}
      <div className="md:hidden flex justify-center gap-4 mt-4">
         <button 
          onClick={() => scroll("left")}
          className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center text-secondary"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => scroll("right")}
          className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center text-secondary"
        >
          <ChevronRight size={20} />
        </button>
      </div>

    </section>
  );
};

export default Testimonials;