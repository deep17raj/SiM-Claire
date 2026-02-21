"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, Suspense } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

// 1. Hook Form & Validation Imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// 2. Validation Schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address").trim().toLowerCase(),
  // For login, we don't need complex regex, just ensure it's not empty
  password: z.string().min(1, "Password is required"), 
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address").trim().toLowerCase(),
});

// --- Main Form Component ---
function LoginFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isVerified = searchParams.get("verified");

  // UI States
  const [view, setView] = useState("LOGIN"); // "LOGIN", "FORGOT_PASSWORD", or "RESET_SENT"
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  // Setup Form for Login
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  // Setup Form for Forgot Password
  const {
    register: registerForgot,
    handleSubmit: handleForgotSubmit,
    formState: { errors: forgotErrors, isSubmitting: isForgotSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
  });

  // --- API Handlers ---
  const onSubmitLogin = async (data) => {
    setServerError("");
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        email: data.email,
        password: data.password,
      });
      console.log(response)

      // Handle successful login (e.g., store token, redirect to dashboard)
      localStorage.setItem("token", response.data.jwt);
      router.push("/dashboard");

    } catch (err) {
      setServerError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  const onSubmitForgotPassword = async (data) => {
    setServerError("");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/forgot/password`, {
        email: data.email,
      });
      // Move to success screen
      setView("RESET_SENT");
    } catch (err) {
      setServerError(err.response?.data?.message || "Failed to process request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 py-8 font-sans flex-col">
      
      {/* Verification Success Banner */}
      {isVerified === "true" && view === "LOGIN" && (
        <div className="bg-green-100 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-6 shadow-sm w-full max-w-[1400px]">
          Email verified successfully! You can now log in.
        </div>
      )}

      {/* Main Card Container */}
      <div className="w-full max-w-[1400px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px] md:min-h-[700px]">
        
        {/* Left Side - Image Section */}
        <div className="w-full lg:w-[55%] relative h-64 md:h-110 lg:h-auto bg-[#e8f4f1]">
          <Image
            src="/abc3.png" 
            alt="Clare the Beaver relaxing on a beach"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-[45%] flex justify-center items-center p-8 md:p-12 lg:p-10 bg-white">
          <div className="w-full max-w-md">

            {/* General Server Error Display */}
            {serverError && (
              <div className="mb-2 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                {serverError}
              </div>
            )}

            {/* ========================================= */}
            {/* VIEW 1: LOGIN FORM                        */}
            {/* ========================================= */}
            {view === "LOGIN" && (
              <>
                <div className="mb-8 text-left">
                  <h1 className="text-2xl md:text-4xl font-bold text-secondary tracking-tight mb-2">
                    Good to see you!
                  </h1>
                  <p className="text-lg text-gray-500 font-normal">
                    Are you ready to start your journey?
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit(onSubmitLogin)} className="space-y-5" noValidate>
                  
                  {/* Email Input */}
                  <div>
                    <input
                      {...registerLogin("email")}
                      type="email"
                      placeholder="Email address"
                      className={`w-full px-5 py-3.5 bg-gray-50 border text-gray-900 text-lg rounded-xl outline-none transition-all placeholder-gray-400 ${
                        loginErrors.email ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:ring-2 focus:ring-[#3a7d71]"
                      }`}
                    />
                    {loginErrors.email && <p className="text-red-500 text-sm mt-1.5 ml-1">{loginErrors.email.message}</p>}
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="relative w-full">
                      <input
                        {...registerLogin("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={`w-full px-5 py-3.5 pr-12 bg-gray-50 border text-gray-900 text-lg rounded-xl outline-none transition-all placeholder-gray-400 ${
                          loginErrors.password ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:ring-2 focus:ring-[#3a7d71]"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-[#3a7d71] transition-colors focus:outline-none"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {loginErrors.password && <p className="text-red-500 text-sm mt-1.5 ml-1">{loginErrors.password.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoginSubmitting}
                      className="w-full py-3.5 px-4 text-brand text-lg md:text-xl border-brand border-2 rounded-lg font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoginSubmitting ? "Logging in..." : "Log In"}
                    </button>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-center mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setServerError("");
                        setView("FORGOT_PASSWORD");
                      }}
                      className="text-brand hover:underline font-medium text-base transition-colors focus:outline-none"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Sign Up Link */}
                  <div className="text-center mt-2 text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="text-brand font-semibold transition-colors hover:underline">
                      Sign Up
                    </Link>
                  </div>
                </form>
              </>
            )}

            {/* ========================================= */}
            {/* VIEW 2: FORGOT PASSWORD FORM              */}
            {/* ========================================= */}
            {view === "FORGOT_PASSWORD" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8 text-left">
                  <h1 className="text-2xl md:text-4xl font-bold text-secondary tracking-tight mb-2">
                    Reset Password
                  </h1>
                  <p className="text-lg text-gray-500 font-normal">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleForgotSubmit(onSubmitForgotPassword)} className="space-y-5" noValidate>
                  <div>
                    <input
                      {...registerForgot("email")}
                      type="email"
                      placeholder="Email address"
                      className={`w-full px-5 py-3.5 bg-gray-50 border text-gray-900 text-lg rounded-xl outline-none transition-all placeholder-gray-400 ${
                        forgotErrors.email ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:ring-2 focus:ring-[#3a7d71]"
                      }`}
                    />
                    {forgotErrors.email && <p className="text-red-500 text-sm mt-1.5 ml-1">{forgotErrors.email.message}</p>}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isForgotSubmitting}
                      className="w-full py-3.5 px-4 bg-brand text-white text-lg md:text-xl rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isForgotSubmitting ? "Sending..." : "Send Reset Link"}
                    </button>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setServerError("");
                        setView("LOGIN");
                      }}
                      className="text-gray-500 hover:text-brand font-medium text-base transition-colors focus:outline-none"
                    >
                      &larr; Back to Log In
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ========================================= */}
            {/* VIEW 3: SUCCESS (RESET LINK SENT)         */}
            {/* ========================================= */}
            {view === "RESET_SENT" && (
              <div className="text-center animate-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">Check your email</h2>
                <p className="text-gray-500 text-lg mb-8">
                  If an account exists with that email, we have sent a password reset link. Please check your spam folder if you don&apos;t see it.
                </p>
                <button
                  onClick={() => setView("LOGIN")}
                  className="text-brand hover:underline font-bold text-lg transition-colors focus:outline-none"
                >
                  Return to Log In
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Suspense Wrapper for useSearchParams (Next.js Requirement)
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#fafafa]">Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}