'use client'; 

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // 1. Import usePathname

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // 2. Get current path

  // Helper function to check if link is active
  const isActive = (path) => pathname === path ? "text-brand" : "text-tertary hover:text-brand";

  return (
    <div className="px-4">
    <nav className="w-full max-w-[1400px]   mx-auto bg-secondary shadow-md rounded-full pr-4 pl-6 md:pr-6 py-0 flex items-center justify-between top-4 z-50 relative">
      
      {/* 1. Logo Section */}
      <Link href="/" className="flex h-17 items-center justify-center gap-6 text-center z-50 ">
        <div className=" h-full w-auto ">
          <Image
            src="/logo2.png"
            alt="Company Logo"
            width={200}
            height={40}
            priority
            className="h-full w-auto object-contain"
          />
        </div>
        <div className=" h-full flex  items-center ">
          <span className="-ml-6  text-tertary font-bold text-3xl lg:text-3xl tracking-tight whitespace-nowrap">
          SiM <span className="text-brand">Claire</span>
        </span>
        </div>
        
      </Link>

      {/* 2. Desktop Navigation Links */}
      <div className="hidden lg:flex items-center space-x-8 font-medium text-[15px]">
        {/* 3. Apply the helper function to each Link */}
        <Link href="/destination" className={`${isActive('/destination')} transition-colors`}>
          Choose a Destination
        </Link>
        <Link href="/why-esim" className={`${isActive('/why-esim')} transition-colors`}>
          Why an eSIM?
        </Link>
        <Link href="/support" className={`${isActive('/support')} transition-colors`}>
          Get Support
        </Link>
        <Link href="/about-us" className={`${isActive('/about-us')} transition-colors`}>
          About Us
        </Link>
        <Link href="/my-esims" className={`${isActive('/my-esims')} transition-colors`}>
          My eSIMs & Top Up
        </Link>
      </div>

      {/* 3. Desktop Auth Buttons (Unchanged) */}
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
        className="lg:hidden text-tertary hover:text-brand focus:outline-none z-50 p-2 "
      >
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
          
          {/* Mobile Links also get the active check */}
          <Link 
            href="/destination" 
            className={`font-medium text-lg ${pathname === '/destination' ? 'text-brand' : 'text-gray-800 hover:text-brand'}`}
            onClick={() => setIsOpen(false)}
          >
            Choose a Destination
          </Link>
          <Link 
            href="/why-esim" 
            className={`font-medium text-lg ${pathname === '/why-esim' ? 'text-brand' : 'text-gray-800 hover:text-brand'}`}
            onClick={() => setIsOpen(false)}
          >
            Why an eSIM?
          </Link>
          <Link 
            href="/support" 
            className={`font-medium text-lg ${pathname === '/support' ? 'text-brand' : 'text-gray-800 hover:text-brand'}`}
            onClick={() => setIsOpen(false)}
          >
            Get Support
          </Link>
          <Link 
            href="/about-us" 
            className={`font-medium text-lg ${pathname === '/about-us' ? 'text-brand' : 'text-gray-800 hover:text-brand'}`}
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link 
            href="/my-esims" 
            className={`font-medium text-lg ${pathname === '/my-esims' ? 'text-brand' : 'text-gray-800 hover:text-brand'}`}
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
                className="text-center w-full py-3 text-lg md:text-xl rounded-xl border-2 border-gray-200 text-gray-800 font-bold hover:border-brand hover:text-brand transition-colors"
                onClick={() => setIsOpen(false)}
             >
               Log In
             </Link>
          </div>
        </div>
      )}

    </nav>
    </div>
  );
};

export default Navbar;