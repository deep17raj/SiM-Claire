import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  return (
    // 1. Outer Page Wrapper: Centers the card vertically and horizontally
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 py-8 font-sans">
      
      {/* 2. The Card Container: Matches your site's max-width, rounding, and shadow */}
      <div className="w-full max-w-[1400px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">
        
        {/* 3. Left Side - Image Section 
            - Mobile: h-64 (fixed height)
            - Desktop: Flex grow to fill height naturally
        */}
        <div className="w-full md:w-1/2 lg:w-[55%] relative h-64 md:h-auto bg-[#e8f4f1]">
          {/* Note: Save your beaver image as 'signup.jpeg' in the public folder */}
          <Image
            src="/signup.jpeg" 
            alt="Clare the Beaver greeting you"
            fill
            priority
            className="object-cover object-[center_24%]"
          />
        </div>

        {/* 4. Right Side - Form Section */}
        <div className="w-full md:w-1/2 lg:w-[45%] flex items-center justify-center p-8 md:p-12 lg:p-20 bg-white">
          <div className="w-full max-w-md">
            
            {/* Header */}
            <div className="mb-8 text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a50] tracking-tight mb-3">
                Hello!
              </h1>
              <p className="text-lg text-gray-500 font-normal">
                Welcome! I'll help you on this journey!
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              
              {/* Full Name */}
              <div>
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  required
                  placeholder="Full name"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-[#3a7d71] focus:border-transparent outline-none transition-all placeholder-gray-400"
                />
              </div>

              {/* Email Address */}
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-[#3a7d71] focus:border-transparent outline-none transition-all placeholder-gray-400"
                />
              </div>

              {/* Split Row: Phone Number & Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Phone Number */}
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-[#3a7d71] focus:border-transparent outline-none transition-all placeholder-gray-400"
                />
                
                {/* Password */}
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-[#3a7d71] focus:border-transparent outline-none transition-all placeholder-gray-400"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  placeholder="Confirm Password"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-[#3a7d71] focus:border-transparent outline-none transition-all placeholder-gray-400"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#3a7d71] hover:bg-[#2c6e63] text-white text-xl font-bold rounded-xl cursor-pointer shadow-lg shadow-teal-900/10 transition-transform active:scale-[0.98] duration-200"
                >
                  Create Account
                </button>
              </div>

              {/* Footer Link */}
              <div className="text-center mt-6 text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-[#1e3a50] hover:text-[#3a7d71] font-semibold transition-colors"
                >
                  Log In
                </Link>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}