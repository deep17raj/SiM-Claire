"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Instagram, Twitter, Facebook } from "lucide-react";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <div className="min-h-screen w-full bg-[#fafafa] relative overflow-hidden flex flex-col items-center justify-center px-4">
      
      {/* --- Background Decorative Blobs --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#077770]/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#ec5b13]/10 rounded-full blur-[80px] pointer-events-none"></div>

      {/* --- Main Content Container --- */}
      <div className="relative z-10 max-w-3xl w-full text-center">
        
        {/* Brand Name */}
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-secondary tracking-tight">
                SiM <span className="text-brand">Claire</span>
            </h2>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-brand mb-6 tracking-tight">
          Coming <span className="text-[#077770]">Soon</span>
        </h1>

      


       

        {/* Back to Home Link */}
        <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-secondary hover:text-[#ec5b13] font-medium transition-colors"
        >
            <ArrowLeft size={18} /> Back to Home
        </Link>

      </div>
    </div>
  );
};

export default ComingSoon;