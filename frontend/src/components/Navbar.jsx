'use client'; // Required for using state (useState)

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Added 'z-50' to ensure navbar stays on top of other content
    <nav className="w-full max-w-[1400px] mx-auto bg-[#077770] shadow-md rounded-full pr-4 md:pr-6 py-4 flex items-center justify-between  top-4 z-50 relative">
      
      {/* 1. Logo Section */}
      <Link href="/" className="flex items-center text-center  z-50">
  <div className="relative h-10 w-auto">
    <Image
      src={logo}
      alt="Company Logo"
      width={200}
      height={40}
      priority
      className="h-18 w-auto object-contain -translate-y-3.5"
    />
  </div>
  {/* Added -ml-6 to pull text closer to the logo */}
  <span className="-ml-6 text-tertary font-bold text-3xl  lg:text-3xl tracking-tight whitespace-nowrap">
    SiM <span className="text-brand">Claire</span>
  </span>
</Link>

      {/* 2. Desktop Navigation Links (Hidden on Mobile) */}
      <div className="hidden lg:flex items-center space-x-8 text-tertary font-medium text-[15px]">
        <Link href="/destination" className="hover:text-brand transition-colors">
          Choose a Destination
        </Link>
        <Link href="/why-esim" className="hover:text-brand transition-colors">
          Why an eSIM?
        </Link>
        <Link href="/support" className="hover:text-brand transition-colors">
          Get Support
        </Link>
        <Link href="/about-us" className="hover:text-brand transition-colors">
          About Us
        </Link>
        <Link href="/my-esims" className="hover:text-brand transition-colors">
          My eSIMs & Top Up
        </Link>
      </div>

      {/* 3. Desktop Auth Buttons (Hidden on Mobile) */}
      <div className="hidden lg:flex items-center gap-6 text-tertary font-semibold text-[15px]">
        <Link href="/signup" className="hover:text-brand transition-colors">
          Sign Up
        </Link>
        <div className="h-5 w-[1px] bg-gray-300"></div>
        <Link href="/login" className="hover:text-brand transition-colors">
          Log In
        </Link>
      </div>

      {/* 4. Mobile Hamburger Button (Visible on LG and below) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden text-tertary hover:text-brand focus:outline-none z-50 p-2"
      >
        {/* Toggle Icon: Shows 'X' if open, 'Hamburger' if closed */}
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* 5. Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col gap-4 lg:hidden animate-in slide-in-from-top-2 duration-200">
          <Link 
            href="/destination" 
            className="text-gray-800 font-medium text-lg hover:text-brand"
            onClick={() => setIsOpen(false)} // Close menu on click
          >
            Choose a Destination
          </Link>
          <Link 
            href="/why-esim" 
            className="text-gray-800 font-medium text-lg hover:text-brand"
            onClick={() => setIsOpen(false)}
          >
            Why an eSIM?
          </Link>
          <Link 
            href="/support" 
            className="text-gray-800 font-medium text-lg hover:text-brand"
            onClick={() => setIsOpen(false)}
          >
            Get Support
          </Link>
          <Link 
            href="/about-us" 
            className="text-gray-800 font-medium text-lg hover:text-brand"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link 
            href="/my-esims" 
            className="text-gray-800 font-medium text-lg hover:text-brand"
            onClick={() => setIsOpen(false)}
          >
            My eSIMs & Top Up
          </Link>
          
          <hr className="border-gray-200 my-2" />
          
          <div className="flex flex-col gap-4">
             <Link 
                href="/signup" 
                className="text-center w-full py-3 text-lg md:text-xl rounded-xl bg-brand text-white font-bold hover:bg-brand transition-colors"
                onClick={() => setIsOpen(false)}
             >
               Sign Up
             </Link>
             <Link 
                href="/login" 
                className="text-center w-full py-3 text-lg md:text-xl  rounded-xl border-2 border-gray-200 text-gray-800 font-bold hover:border-brand hover:text-brand transition-colors"
                onClick={() => setIsOpen(false)}
             >
               Log In
             </Link>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;