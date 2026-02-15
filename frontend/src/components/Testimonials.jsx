import Image from "next/image";
import React from "react";

// --- MOCK DATA ---
const testimonialsData = [
  {
    id: 1,
    quote: "Exceeded our expectations with innovative designs that brought our vision to life - a truly remarkable creative agency.",
    name: "Samantha Johnson",
    title: "CEO and Co-founder of ABC Company",
    avatar: "/avatars/avatar1.png", 
  },
  {
    id: 2,
    quote: "Their ability to capture our brand essence in every project is unparalleled - an invaluable creative collaborator.",
    name: "Isabella Rodriguez",
    title: "Marketing Director at XYZ Corp",
    avatar: "/avatars/avatar2.png",
  },
  {
    id: 3,
    quote: "Creative geniuses who listen, understand, and craft captivating visuals - an agency that truly understands our needs.",
    name: "Gabrielle Williams",
    title: "Head of Product at StartupIO",
    avatar: "/avatars/avatar3.png",
  },
  {
    id: 4,
    quote: "From concept to execution, their creativity knows no bounds - a game-changer for our brand's success.",
    name: "Natalie Martinez",
    title: "Brand Manager at Enterprise Solutions",
    avatar: "/avatars/avatar4.png",
  },
  {
    id: 5,
    quote: "Their team's artistic flair and strategic approach resulted in remarkable campaigns - a reliable creative partner.",
    name: "John Peter",
    title: "CEO and Co-founder of ABC Company",
    avatar: "/avatars/avatar5.png",
  },
];

// --- SUB-COMPONENT: Single Testimonial Card ---
const TestimonialCard = ({ data }) => {
  return (
    <div className="w-[350px] md:w-[400px] p-8 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-full shrink-0 mx-4 transition-transform hover:scale-[1.02] duration-300">
      <div>
        {/* Quote Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-secondary mb-6 opacity-50">
          <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
        </svg>
        
        {/* Quote Text */}
        <p className="text-[#2d3240] text-lg font-medium leading-relaxed mb-8">
          "{data.quote}"
        </p>
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
          <Image src={data.avatar} alt={data.name} fill className="object-cover" />
        </div>
        <div>
          <h4 className="text-[#2d3240] font-bold">{data.name}</h4>
          <p className="text-gray-500 text-sm">{data.title}</p>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: Scrolling Row (Marquee) ---
const MarqueeRow = ({ data, direction = "left", speed = "40s" }) => {
  const animationClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right";
  
  // Duplicate data for seamless loop
  const duplicatedData = [...data, ...data];

  return (
    // 'group' class is crucial here. It detects hover on the container.
    <div className="flex overflow-hidden select-none w-full mask-edges-gradient py-4 group">
      
      <div 
        className={`flex shrink-0 gap-8 ${animationClass}`}
        style={{ animationDuration: speed }}
      >
        {duplicatedData.map((item, idx) => (
          <TestimonialCard key={`${item.id}-${idx}-${direction}`} data={item} />
        ))}
      </div>
    </div>
  );
};


// --- MAIN COMPONENT ---
const Testimonials = () => {
  const firstRowData = testimonialsData.slice(0, 3);
  const secondRowData = testimonialsData.slice(2, 5);

  return (
    <section className="py-16 bg-[#fafafa] overflow-hidden">
      <style>{`
        /* Animation Definitions */
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right linear infinite;
        }

        /* --- THE FIX: Stop animation on hover --- */
        /* When the element with class 'group' is hovered, pause the animation children */
        .group:hover .animate-scroll-left,
        .group:hover .animate-scroll-right {
          animation-play-state: paused;
        }

        /* Gradient Mask for Edges */
        .mask-edges-gradient {
            mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
      `}</style>

      <div className="w-full max-w-[1400px] mx-auto px-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2d3240] max-w-2xl mx-auto">
          Words of praise from others about our presence.
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        {/* Row 1 */}
        <MarqueeRow data={firstRowData} direction="left" speed="50s" />
        
        {/* Row 2 */}
        <MarqueeRow data={secondRowData} direction="right" speed="60s" />
      </div>

    </section>
  );
};

export default Testimonials;