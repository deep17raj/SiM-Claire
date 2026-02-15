"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-[#fafafa] min-h-screen font-sans text-slate-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* 1. Static Top Heading (Teal) */}
        <h1 className="text-2xl md:text-5xl font-extrabold text-secondary text-center mb-10 tracking-tight leading-tight">
          About SiM Claire: <br />
          <span className="text-[#2c6e63]">Your Global Connection, Simplified.</span>
        </h1>

        {/* 2. Hero Image */}
        <div className="relative w-full aspect-video  rounded-3xl overflow-hidden shadow-2xl shadow-secondary/20 mb-12 border-4 border-white">
          {/* Ensure you save the beaver image as 'about.jpg' in your public folder */}
          <Image
            src="/about.png" 
            alt="Claire the Beaver helping with customer support"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 3. Animated Text Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 min-h-[400px]">
          <TypewriterSequence />
        </div>

      </div>
    </div>
  );
}

// --- Sub-Component: Handles the specific timing and coloring of the text ---
const TypewriterSequence = () => {
  // We break the text into segments to apply different styles (Orange, Regular, Teal)
  const segments = [
    {
      text: "At SiM Claire, we believe every journey deserves a seamless connection. Our mission is simple: to keep you connected effortlessly, wherever your adventures take you.",
      className: "text-md md:text-lg text-slate-600 leading-relaxed block mb-6", // Body 1
      delay: 0 // Start typing after previous line finishes
    },
    {
      text: "Meet Claire: Your Trusted Travel Companion",
      className: "text-xl md:text-3xl font-bold text-brand block mb-6", // Orange Heading
      delay: 5000
    },
    
    {
      text: "Claire isn't just our name; she's the heart of our brand - a resourceful beaver embodying our commitment to building reliable bridges across the globe. Claire represents our promise to deliver robust, easy-to-use eSIM solutions so you can focus on what truly matters:",
      className: "text-md md:text-lg text-slate-600 leading-relaxed block ", // Body 2
      delay: 6000
    },
    {
      text: "experiencing the world.",
      className: "text-xl font-bold text-secondary block", // Teal Closing
      delay: 14000
    }
  ];

  return (
    <div>
      {segments.map((segment, index) => (
        <TypewriterLine 
          key={index}
          text={segment.text}
          className={segment.className}
          startDelay={segment.delay}
        />
      ))}
    </div>
  );
};

// --- Helper: Types out a single string ---
const TypewriterLine = ({ text, className, startDelay }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // 1. Wait for the start delay before beginning typing
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!hasStarted) return;

    let currentIndex = 0;
    // 2. Typing interval (adjust '30' for speed)
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30); // 30ms per character

    return () => clearInterval(typingInterval);
  }, [hasStarted, text]);

  // We render a non-breaking space if empty so the layout doesn't jump
  return (
    <span className={className}>
      {displayedText}
      {/* Blinking Cursor only shows while typing this specific line */}
      {hasStarted && displayedText.length < text.length && (
        <span className="inline-block w-0.5 h-5 ml-1 bg-brand animate-pulse align-middle"></span>
      )}
    </span>
  );
};