import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className=" min-h-screen font-sans text-slate-900 pt-16 px-4">
      <div className='bg-bget rounded-2xl pb-10'>
      <div className=" max-w-4xl mx-auto">
        
        {/* 1. Static Top Heading (Teal) */}
        <h1 className="text-2xl md:text-4xl font-bold text-secondary text-center mb-10 tracking-tight leading-tight">
          About SiM Claire: <br />
          <span className="text-brand">Your Global Connection, Simplified.</span>
        </h1>

        {/* 2. Hero Image */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-secondary/20 mb-12 border-4 border-white">
          <Image
            src="/about.png" 
            alt="Claire the Beaver helping with customer support"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 3. Static Text Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 min-h-[300px]">
          
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed block mb-8">
            At SiM Claire, we believe every journey deserves a seamless connection. Our mission is simple: to keep you connected effortlessly, wherever your adventures take you.
          </p>

          <h2 className="text-2xl md:text-4xl font-bold text-brand block mb-6">
            Meet Claire: Your Trusted Travel Companion
          </h2>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed block mb-2">
            Claire isn't just our name; she's the heart of our brand - a resourceful beaver embodying our commitment to building reliable bridges across the globe. Claire represents our promise to deliver robust, easy-to-use eSIM solutions so you can focus on what truly matters: experiencing the world.
          </p>

          

        </div>

      </div>
      </div>
    </div>
  );
}