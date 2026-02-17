"use client";
import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react'; // You can also use a specific WhatsApp SVG if you prefer

const WhatsAppButton = () => {
  // Replace with your actual support number (including country code, e.g., 15551234567)
  const phoneNumber = "1234567890"; 
  const message = "Hi SiM Claire, I need help with my eSIM.";

  return (
    <Link 
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-10 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative w-14 h-14 bg-brand rounded-full flex items-center justify-center shadow-lg shadow-brand/30 transition-transform duration-300 hover:scale-110 hover:-translate-y-1">
        
        {/* Tooltip (Optional) */}
        <span className="absolute right-full ml-4 bg-secondary text-white text-sm font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Chat with Support
        </span>

        {/* Icon */}
        <MessageCircle color="white" size={32} fill="white" />
        
        {/* Pulse Effect */}
        
      </div>
    </Link>
  );
};

export default WhatsAppButton;