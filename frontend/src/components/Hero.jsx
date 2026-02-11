import Image from "next/image";

const Hero = () => {
  return (
    <div className="px-4 py-8">
       <div className="w-full max-w-[1400px] h-160 mx-auto aspect-video relative rounded-2xl overflow-hidden">
      
      <Image
        src="/hero3.png"
        alt="Hero Image"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute -right-10 bottom-75 -translate-x-1/2 z-10">
  <div className="relative">
    
    <input
      id="dest"
      name="dest"
      type="text"
      placeholder="Search destination"
      className="bg-white pl-12 pr-5 py-3 border-4 border-[#f2671c] rounded-full text-black outline-none w-100"
    />

    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f2671c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="22"
        height="22"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>

  </div>
</div>


    </div>
    </div>
   
  );
};

export default Hero;
