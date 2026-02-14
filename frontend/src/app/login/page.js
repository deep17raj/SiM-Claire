import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    // 1. Outer Page Wrapper: Centers the card vertically and horizontally
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 py-8 font-sans">
      
      {/* 2. The Card Container: Matches your site's max-width and rounded style */}
      <div className="w-full max-w-[1400px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] md:min-h-[750px]">
        
        {/* 3. Image Section 
            - Mobile: h-64 (fixed height)
            - Desktop: Flex grow to fill height (removed h-screen)
        */}
        <div className="w-full md:w-1/2 lg:w-[55%] relative h-64 md:h-auto bg-[#e8f4f1]">
          <Image
            src="/login.png" 
            alt="Clare the Beaver relaxing on a beach"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* 4. Form Section */}
        <div className="w-full md:w-1/2 lg:w-[45%] flex items-center justify-center p-8 md:p-12 lg:p-20 bg-white">
          <div className="w-full max-w-md">
            
            {/* Header */}
            <div className="mb-8 md:mb-10 text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a50] tracking-tight  mb-2">
                Good to see you!
              </h1>
              <p className="text-lg text-gray-500 font-normal">
                Are you ready to start your journey?
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              
              {/* Email Input */}
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

              {/* Password Input */}
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-[#3a7d71] focus:border-transparent outline-none transition-all placeholder-gray-400"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-secondary hover:bg-[#2c6e63] text-white text-xl font-bold rounded-xl cursor-pointer shadow-lg shadow-teal-900/10 transition-transform active:scale-[0.98] duration-200"
                >
                  Log In
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-center mt-6">
                <Link
                  href="/forgot-password"
                  className="text-secondary hover:text-[#1a6256] font-medium text-base transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}