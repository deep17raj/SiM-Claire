"use client"; // 1. Must be a client component

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  // --- UI States ---
  const [step, setStep] = useState(1); // 1 = Signup Form, 2 = OTP Form
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // --- Form Data States ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");

  // --- Timer State for Resend OTP ---
  const [timeLeft, setTimeLeft] = useState(60);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Timer logic for Resend OTP
  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, timeLeft]);

  // --- Step 1: Handle Initial Signup (Send OTP) ---
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      // Replace with your actual backend URL using environment variables
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signup failed");

      // Success: Move to OTP step
      setStep(2);
      setTimeLeft(60); // Reset timer
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Step 2: Handle OTP Verification ---
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send email along with OTP so backend knows who to verify
        body: JSON.stringify({ email: formData.email, otp }), 
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Invalid OTP");

      // Success: Redirect to login or dashboard
      router.push("/login?verified=true");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Step 3: Handle Resend OTP ---
  const handleResendOtp = async () => {
    setError("");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resend/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      setTimeLeft(60); // Restart the countdown
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 py-8 font-sans">
      <div className="w-full max-w-[1400px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
        
        {/* Left Side - Image Section */}
        <div className="w-full lg:w-[55%] relative h-64 md:h-110 lg:h-auto bg-[#e8f4f1]">
          <Image
            src="/abc.png" 
            alt="Clare the Beaver greeting you"
            fill
            priority
            className="object-cover object-[center_42%]"
          />
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-[45%] flex items-center justify-center p-8 md:p-12 lg:p-20 bg-white">
          <div className="w-full max-w-md">
            
            {/* Error Message Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            {/* --- RENDER STEP 1: SIGNUP FORM --- */}
            {step === 1 && (
              <>
                <div className="mb-8 text-left">
                  <h1 className="text-2xl md:text-4xl font-bold text-secondary tracking-tight mb-3">
                    Hello!, I am Claire.
                  </h1>
                  <p className="text-xl md:text-lg text-gray-500 font-normal">
                    Welcome! I&apos;ll help you on this journey!
                  </p>
                </div>

                <form onSubmit={handleSignupSubmit} className="space-y-5">
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-[#3a7d71] focus:border-transparent outline-none transition-all placeholder-gray-400"
                  />
                  
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-[#3a7d71] focus:border-transparent outline-none transition-all placeholder-gray-400"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-[#3a7d71] focus:border-transparent outline-none transition-all placeholder-gray-400"
                    />
                    <input
                      name="password"
                      type="password"
                      required
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-[#3a7d71] focus:border-transparent outline-none transition-all placeholder-gray-400"
                    />
                  </div>
                  
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-[#3a7d71] focus:border-transparent outline-none transition-all placeholder-gray-400"
                  />

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-4 font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 cursor-pointer text-brand text-lg md:text-xl border-brand border-2 rounded-lg disabled:opacity-50"
                    >
                      {loading ? "Processing..." : "Create Account"}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-6 text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-brand font-semibold transition-colors hover:underline">
                    Log In
                  </Link>
                </div>
              </>
            )}

            {/* --- RENDER STEP 2: OTP FORM --- */}
            {step === 2 && (
              <>
                <div className="mb-8 text-left">
                  <h1 className="text-2xl md:text-4xl font-bold text-secondary tracking-tight mb-3">
                    Check your email
                  </h1>
                  <p className="text-xl md:text-lg text-gray-500 font-normal">
                    We&apos;ve sent a verification code to <span className="font-semibold">{formData.email}</span>.
                  </p>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-5">
                  <input
                    type="text"
                    required
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 text-center tracking-widest text-2xl rounded-xl focus:ring-2 focus:ring-[#3a7d71] focus:border-transparent outline-none transition-all placeholder-gray-400"
                  />

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading || otp.length < 6}
                      className="w-full py-3.5 px-4 font-bold bg-brand text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 cursor-pointer text-lg md:text-xl rounded-lg disabled:opacity-50"
                    >
                      {loading ? "Verifying..." : "Verify & Continue"}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-6 text-gray-600">
                  Didn&apos;t receive the code?{' '}
                  {timeLeft > 0 ? (
                    <span className="text-gray-400 font-semibold">
                      Resend in {timeLeft}s
                    </span>
                  ) : (
                    <button 
                      onClick={handleResendOtp}
                      className="text-brand font-semibold transition-colors hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}