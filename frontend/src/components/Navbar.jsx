import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";

const Navbar = () => {
  return (
    <nav className="w-full max-w-[1400px] mx-auto bg-white shadow-md rounded-full px-8 py-4 flex items-center justify-between">
      
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-2">
        <div className="relative h-10 w-auto"> {/* Wrapper to control height */}
            <Image
            src={logo}
            alt="Company Logo"
            width={160} // Defines aspect ratio
            height={40} // Defines aspect ratio
            priority
            // h-10 sets height to 40px, w-auto automatically adjusts width based on aspect ratio
            className="h-20 w-auto object-contain -translate-y-5.5" 
            />
        </div>
        <span className="text-[#f2671c] font-bold text-2xl tracking-tight">
          SiM Claire
        </span>
      </Link>

      {/* Navigation Links (Desktop) */}
      <div className="hidden lg:flex items-center space-x-8 text-gray-800 font-medium text-[15px]">
        <Link href="/destination" className="hover:text-[#f2671c] transition-colors">
          Choose a Destination
        </Link>
        <Link href="/why-esim" className="hover:text-[#f2671c] transition-colors">
          Why an eSIM?
        </Link>
        <Link href="/support" className="hover:text-[#f2671c] transition-colors">
          Get Support
        </Link>
        <Link href="/contact" className="hover:text-[#f2671c] transition-colors">
          Contact
        </Link>
        <Link href="/my-esims" className="hover:text-[#f2671c] transition-colors">
          My eSIMs & Top Up
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="hidden sm:flex items-center gap-6 text-gray-900 font-semibold text-[15px]">
        <Link href="/signup" className="hover:text-[#f2671c] transition-colors">
          Sign Up
        </Link>
        <div className="h-5 w-[1px] bg-gray-300"></div>
        <Link href="/login" className="hover:text-[#f2671c] transition-colors">
          Log In
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;