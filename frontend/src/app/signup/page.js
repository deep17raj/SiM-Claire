import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  return (
    // 1. Outer Page Wrapper: Centers the card vertically and horizontally
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 py-8 font-sans">
      
      {/* 2. The Card Container: Matches your site's max-width, rounding, and shadow */}
      <div className="w-full max-w-[1400px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
        
        {/* 3. Left Side - Image Section 
            - Mobile: h-64 (fixed height)
            - Desktop: Flex grow to fill height naturally
        */}
        <div className="w-full  lg:w-[55%] relative h-64 md:h-110 lg:h-auto bg-[#e8f4f1]">
          {/* Note: Save your beaver image as 'signup.jpeg' in the public folder */}
          <Image
            src="/abc.png" 
            alt="Clare the Beaver greeting you"
            fill
            priority
            className="object-cover object-[center_42%] "
          />
        </div>

        {/* 4. Right Side - Form Section */}
        <div className="w-full lg:w-[45%] flex items-center justify-center p-8 md:p-12 lg:p-20 bg-white">
          <div className="w-full max-w-md">
            
            {/* Header */}
            <div className="mb-8 text-left">
              <h1 className="text-2xl md:text-4xl font-bold text-secondary tracking-tight mb-3">
                Hello!, I am Claire.
              </h1>
              <p className="text-xl md:text-lg text-gray-500 font-normal">
                Welcome! I&apos;ll help you on this journey!
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
                  className="w-full py-3.5 px-4 font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 transition-all duration-300 cursor-pointer text-brand text-lg md:text-xl border-brand border-2 rounded-lg"
                >
                  Create Account
                </button>
              </div>

              {/* Footer Link */}
              <div className="text-center mt-6 text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-brand h font-semibold transition-colors hover:underline"
                >
                  log In
                </Link>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}