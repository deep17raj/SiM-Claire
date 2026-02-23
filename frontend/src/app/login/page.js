"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, Suspense, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

// 1. Hook Form & Validation Imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// --- Validation Schemas ---
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address").trim().toLowerCase(),
});

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[\W_]/, "Must contain at least one symbol"),
  confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});


// --- Main Form Component ---
function LoginFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isVerified = searchParams.get("verified");

  // UI States
  // Views: "LOGIN", "FORGOT_PASSWORD", "VERIFY_OTP", "RESET_PASSWORD", "VERIFY_ACCOUNT_OTP"
  const [view, setView] = useState("LOGIN");
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");

  // OTP Flow States (Used for both Password Reset AND Account Verification)
  const [targetEmail, setTargetEmail] = useState(""); // Renamed for clarity since it handles both flows now
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // --- Resend OTP Timer Logic (Now handles both OTP views) ---
  useEffect(() => {
    if ((view === "VERIFY_OTP" || view === "VERIFY_ACCOUNT_OTP") && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [view, timeLeft]);

  // --- Form Setups ---
  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors, isSubmitting: isLoginSubmitting } } = useForm({
    resolver: zodResolver(loginSchema), mode: "onTouched",
  });

  const { register: registerForgot, handleSubmit: handleForgotSubmit, formState: { errors: forgotErrors, isSubmitting: isForgotSubmitting } } = useForm({
    resolver: zodResolver(forgotPasswordSchema), mode: "onTouched",
  });

  const { register: registerReset, handleSubmit: handleResetSubmit, formState: { errors: resetErrors, isSubmitting: isResetSubmitting }, reset: resetForm } = useForm({
    resolver: zodResolver(resetPasswordSchema), mode: "onTouched",
  });


  // ==========================================
  // API HANDLERS: LOGIN & ACCOUNT VERIFICATION
  // ==========================================

  const onSubmitLogin = async (data) => {
    setServerError(""); setServerSuccess("");
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        email: data.email,
        password: data.password,
      }, { withCredentials: true });

      router.push("/profile");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid email or password.";


      // Check if the backend is telling us the email isn't verified
      // Adjust this string to match exactly what your backend sends!
      if (errorMessage.toLowerCase().includes("not verified")) {
        setTargetEmail(data.email);
        setTimeLeft(60);
        setView("VERIFY_ACCOUNT_OTP");
        // Optional: Show a friendly message explaining the shift
        setServerSuccess("Account not verified. We just sent a new OTP to your email.");
      } else {
        setServerError(errorMessage);
      }
    }
  };

  const handleVerifyAccountOtp = async (e) => {
    e.preventDefault();
    setServerError(""); setServerSuccess("");
    setOtpLoading(true);
    try {
      // NOTE: Update this URL to match your backend's actual verification endpoint
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/verify/otp`, {
        email: targetEmail,
        otp: otp,
      });

      // On success, clear OTP and send them back to login to try again
      setOtp("");
      setView("LOGIN");
      setServerSuccess("Account verified successfully! You can now log in.");
    } catch (err) {
      setServerError(err.response?.data?.message || "Invalid or expired OTP code.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendAccountOtp = async () => {
    setServerError("");
    try {
      // NOTE: Update this URL to match your backend's resend verification endpoint
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/resend/otp`, {
        email: targetEmail,
      });
      setTimeLeft(60); // Restart countdown
    } catch (err) {
      setServerError(err.response?.data?.message || "Failed to resend OTP.");
    }
  };

  // ==========================================
  // API HANDLERS: PASSWORD RESET FLOW
  // ==========================================

  const onSubmitForgotPassword = async (data) => {
    setServerError("");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/forgot/password-initiate`, {
        email: data.email,
      });
      setTargetEmail(data.email);
      setTimeLeft(60);
      setView("VERIFY_OTP");
    } catch (err) {
      setServerError(err.response?.data?.message || "Failed to process request. Please try again.");
    }
  };

  const handleVerifyPasswordOtp = (e) => {
    e.preventDefault();
    setServerError("");
    setView("RESET_PASSWORD");
  };

  const handleResendPasswordOtp = async () => {
    setServerError("");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/resend/otp`, {
        email: targetEmail,
      });
      setTimeLeft(60);
    } catch (err) {
      setServerError(err.response?.data?.message || "Failed to resend OTP.");
    }
  };

  const onSubmitResetPassword = async (data) => {
    setServerError("");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/forgot-password/verify`, {
        email: targetEmail,
        otp: otp,
        newPass: data.password,
      });

      setServerSuccess("Password updated successfully! You can now log in.");
      resetForm();
      setOtp("");
      setView("LOGIN");

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to reset password. Please try again.";
      setServerError(errorMessage);

      if (errorMessage === 'Invalid OTP') {
        setView("VERIFY_OTP");
        setTimeLeft(0);
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 py-8 font-sans flex-col">

      {/* Verification Success Banner */}
      {isVerified === "true" && view === "LOGIN" && !serverSuccess && (
        <div className="bg-green-100 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-6 shadow-sm w-full max-w-[1400px]">
          Email verified successfully! You can now log in.
        </div>
      )}

      {/* General Success Banner (Used for resetting passwords or switching to verification) */}
      {serverSuccess && (view === "LOGIN" || view === "VERIFY_ACCOUNT_OTP") && (
        <div className="bg-green-100 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-6 shadow-sm w-full max-w-[1400px] text-center font-semibold">
          {serverSuccess}
        </div>
      )}

      {/* Main Card Container */}
      <div className="w-full max-w-[1400px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px] md:min-h-[700px]">

        {/* Left Side - Image Section */}
        <div className="w-full lg:w-[55%] relative h-64 md:h-110 lg:h-auto bg-[#e8f4f1]">
          <Image src="/abc3.png" alt="Clare the Beaver relaxing on a beach" fill priority className="object-cover object-center" />
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-[45%] flex justify-center items-center p-8 md:p-12 lg:p-10 bg-white">
          <div className="w-full max-w-md">

            {/* General Server Error Display */}
            {serverError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                {serverError}
              </div>
            )}

            {/* ========================================= */}
            {/* VIEW 1: LOGIN FORM                        */}
            {/* ========================================= */}
            {view === "LOGIN" && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-8 text-left">
                  <h1 className="text-2xl md:text-4xl font-bold text-secondary tracking-tight mb-2">Good to see you!</h1>
                  <p className="text-lg text-gray-500 font-normal">Are you ready to start your journey?</p>
                </div>

                <form onSubmit={handleLoginSubmit(onSubmitLogin)} className="space-y-5" noValidate>
                  {/* Email Input */}
                  <div>
                    <input
                      {...registerLogin("email")}
                      type="email"
                      placeholder="Email address"
                      className={`w-full px-5 py-3.5 bg-gray-50 border text-gray-900 text-lg rounded-xl outline-none transition-all placeholder-gray-400 ${loginErrors.email ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:ring-2 focus:ring-secondary"}`}
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
                        className={`w-full px-5 py-3.5 pr-12 bg-gray-50 border text-gray-900 text-lg rounded-xl outline-none transition-all placeholder-gray-400 ${loginErrors.password ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:ring-2 focus:ring-secondary"}`}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-secondary transition-colors focus:outline-none">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {loginErrors.password && <p className="text-red-500 text-sm mt-1.5 ml-1">{loginErrors.password.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button type="submit" disabled={isLoginSubmitting} className="w-full py-3.5 px-4 text-brand text-lg md:text-xl border-brand border-2 rounded-lg font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isLoginSubmitting ? "Logging in..." : "Log In"}
                    </button>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-center mt-6">
                    <button
                      type="button"
                      onClick={() => { setServerError(""); setServerSuccess(""); setView("FORGOT_PASSWORD"); }}
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
              </div>
            )}

            {/* ========================================= */}
            {/* VIEW 2: REQUEST OTP (FORGOT PASSWORD)     */}
            {/* ========================================= */}
            {view === "FORGOT_PASSWORD" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8 text-left">
                  <h1 className="text-2xl md:text-4xl font-bold text-secondary tracking-tight mb-2">Reset Password</h1>
                  <p className="text-lg text-gray-500 font-normal">Enter your email address and we&apos;ll send you a 6-digit code to reset your password.</p>
                </div>

                <form onSubmit={handleForgotSubmit(onSubmitForgotPassword)} className="space-y-5" noValidate>
                  <div>
                    <input
                      {...registerForgot("email")}
                      type="email"
                      placeholder="Email address"
                      className={`w-full px-5 py-3.5 bg-gray-50 border text-gray-900 text-lg rounded-xl outline-none transition-all placeholder-gray-400 ${forgotErrors.email ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:ring-2 focus:ring-secondary"}`}
                    />
                    {forgotErrors.email && <p className="text-red-500 text-sm mt-1.5 ml-1">{forgotErrors.email.message}</p>}
                  </div>

                  <div className="pt-2">
                    <button type="submit" disabled={isForgotSubmitting} className="w-full py-3.5 px-4 bg-brand text-white text-lg md:text-xl rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isForgotSubmitting ? "Sending Code..." : "Send Verification Code"}
                    </button>
                  </div>

                  <div className="text-center mt-6">
                    <button type="button" onClick={() => { setServerError(""); setView("LOGIN"); }} className="text-gray-500 hover:text-brand font-medium text-base transition-colors focus:outline-none">
                      &larr; Back to Log In
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ========================================= */}
            {/* VIEW 3A: VERIFY OTP (FOR PASSWORD RESET)  */}
            {/* ========================================= */}
            {view === "VERIFY_OTP" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8 text-left">
                  <h1 className="text-2xl md:text-4xl font-bold text-secondary tracking-tight mb-3">Verify Code</h1>
                  <p className="text-xl md:text-lg text-gray-500 font-normal">
                    We&apos;ve sent a password reset code to <span className="font-semibold text-gray-800">{targetEmail}</span>.
                  </p>
                </div>

                <form onSubmit={handleVerifyPasswordOtp} className="space-y-6">
                  <div>
                    <input
                      type="text" required placeholder="Enter 6-digit OTP" maxLength={6}
                      value={otp} onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 text-gray-900 text-center tracking-[0.5em] text-2xl font-bold rounded-xl focus:ring-2 focus:ring-secondary outline-none transition-all"
                    />
                  </div>

                  <button type="submit" disabled={otp.length < 6} className="w-full py-3.5 px-4 font-bold bg-brand text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 cursor-pointer text-lg md:text-xl rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                    Continue to Reset Password
                  </button>
                </form>

                <div className="text-center mt-8 text-gray-600">
                  Didn&apos;t receive the code?{' '}
                  {timeLeft > 0 ? (
                    <span className="text-gray-400 font-semibold inline-block min-w-[120px]">Resend in {timeLeft}s</span>
                  ) : (
                    <button type="button" onClick={handleResendPasswordOtp} className="text-brand font-semibold transition-colors hover:underline inline-block min-w-[120px]">
                      Resend OTP
                    </button>
                  )}
                </div>

                <div className="text-center mt-4">
                  <button type="button" onClick={() => { setServerError(""); setView("FORGOT_PASSWORD"); }} className="text-gray-400 hover:text-gray-600 text-sm transition-colors focus:outline-none">
                    Wrong email address?
                  </button>
                </div>
              </div>
            )}

            {/* ========================================= */}
            {/* VIEW 3B: VERIFY OTP (FOR ACCOUNT ACTIVATION) */}
            {/* ========================================= */}
            {view === "VERIFY_ACCOUNT_OTP" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8 text-left">
                  <h1 className="text-2xl md:text-4xl font-bold text-secondary tracking-tight mb-3">Verify Account</h1>
                  <p className="text-xl md:text-lg text-gray-500 font-normal">
                    Please verify your email to log in. We&apos;ve sent a code to <span className="font-semibold text-gray-800">{targetEmail}</span>.
                  </p>
                </div>

                <form onSubmit={handleVerifyAccountOtp} className="space-y-6">
                  <div>
                    <input
                      type="text" required placeholder="Enter 6-digit OTP" maxLength={6}
                      value={otp} onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 text-gray-900 text-center tracking-[0.5em] text-2xl font-bold rounded-xl focus:ring-2 focus:ring-secondary outline-none transition-all"
                    />
                  </div>

                  <button type="submit" disabled={otpLoading || otp.length < 6} className="w-full py-3.5 px-4 font-bold bg-brand text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 cursor-pointer text-lg md:text-xl rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                    {otpLoading ? "Verifying..." : "Verify Account"}
                  </button>
                </form>

                <div className="text-center mt-8 text-gray-600">
                  Didn&apos;t receive the code?{' '}
                  {timeLeft > 0 ? (
                    <span className="text-gray-400 font-semibold inline-block min-w-[120px]">Resend in {timeLeft}s</span>
                  ) : (
                    <button type="button" onClick={handleResendAccountOtp} className="text-brand font-semibold transition-colors hover:underline inline-block min-w-[120px]">
                      Resend OTP
                    </button>
                  )}
                </div>

                <div className="text-center mt-4">
                  <button type="button" onClick={() => { setServerError(""); setServerSuccess(""); setView("LOGIN"); }} className="text-gray-400 hover:text-gray-600 text-sm transition-colors focus:outline-none">
                    &larr; Back to Log In
                  </button>
                </div>
              </div>
            )}

            {/* ========================================= */}
            {/* VIEW 4: CREATE NEW PASSWORD               */}
            {/* ========================================= */}
            {view === "RESET_PASSWORD" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8 text-left">
                  <h1 className="text-2xl md:text-4xl font-bold text-secondary tracking-tight mb-2">Create New Password</h1>
                  <p className="text-lg text-gray-500 font-normal">Your new password must be different from previous used passwords.</p>
                </div>

                <form onSubmit={handleResetSubmit(onSubmitResetPassword)} className="space-y-5" noValidate>
                  {/* New Password Input */}
                  <div>
                    <div className="relative w-full">
                      <input
                        {...registerReset("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        className={`w-full px-5 py-3.5 pr-12 bg-gray-50 border text-gray-900 text-lg rounded-xl outline-none transition-all placeholder-gray-400 ${resetErrors.password ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:ring-2 focus:ring-secondary"}`}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-secondary transition-colors focus:outline-none">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {resetErrors.password && <p className="text-red-500 text-sm mt-1.5 ml-1 leading-tight">{resetErrors.password.message}</p>}
                  </div>

                  {/* Confirm New Password Input */}
                  <div>
                    <input
                      {...registerReset("confirm_password")}
                      type="password"
                      placeholder="Confirm New Password"
                      className={`w-full px-5 py-3.5 bg-gray-50 border text-gray-900 text-lg rounded-xl outline-none transition-all placeholder-gray-400 ${resetErrors.confirm_password ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:ring-2 focus:ring-secondary"}`}
                    />
                    {resetErrors.confirm_password && <p className="text-red-500 text-sm mt-1.5 ml-1">{resetErrors.confirm_password.message}</p>}
                  </div>

                  <div className="pt-2">
                    <button type="submit" disabled={isResetSubmitting} className="w-full py-3.5 px-4 bg-brand text-white text-lg md:text-xl rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isResetSubmitting ? "Updating..." : "Reset Password"}
                    </button>
                  </div>
                </form>
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