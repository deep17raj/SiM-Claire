"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios"; // Imported Axios

import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").trim(),
  email: z.string().email("Please enter a valid email address").trim().toLowerCase(),
  phone: z.string().min(10, "Please enter a valid phone number").trim(),
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

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  
  // --- OTP Flow States ---
  const [step, setStep] = useState("SIGNUP"); // "SIGNUP" or "OTP"
  const [registeredEmail, setRegisteredEmail] = useState(""); // Remember email for OTP
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [otpLoading, setOtpLoading] = useState(false);

  // --- Timer logic for Resend OTP ---
  useEffect(() => {
    if (step === "OTP" && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [step, timeLeft]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });

  // --- STEP 1: Handle Signup ---
  const onSubmitSignup = async (data) => {
    setServerError("");
    try {
      // Using Axios for cleaner requests
      console.log('+'+data.phone)
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        name: data.name,
        email: data.email,
        phone: '+'+data.phone,
        password: data.password,
      });
      console.log(res);

      // On success: Save the email, switch to OTP view, and start the timer
      setRegisteredEmail(data.email);
      setStep("OTP");
      setTimeLeft(6);

    } catch (err) {
      // Axios puts server error messages inside err.response.data
      setServerError(err.response?.data?.message || "Failed to create account. Please try again.");
    }
  };

  // --- STEP 2: Handle OTP Verification ---
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setServerError("");
    setOtpLoading(true);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/otp/verify`, {
        email: registeredEmail,
        otp: otp,
      });
      console.log(res)
      // OTP is correct! Redirect to login or dashboard
      router.push("/login?verified=true");

    } catch (err) {
      setServerError(err.response?.data?.message || "Invalid OTP code.");
    } finally {
      setOtpLoading(false);
    }
  };

  // --- STEP 3: Handle Resend OTP ---
  const handleResendOtp = async () => {
    setServerError("");
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/otp/resend`, {
        email: registeredEmail,
      });
      console.log(response)
      // Restart the countdown timer
      setTimeLeft(6);
    } catch (err) {
      setServerError(err.response?.data?.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 py-8 font-sans">
      <div className="w-full max-w-[1400px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px]">

        {/* Left Side - Image Section */}
        <div className="w-full lg:w-[55%] relative h-64 md:h-110 lg:h-auto bg-[#e8f4f1]">
          <Image src="/abc.png" alt="Clare the Beaver greeting you" fill priority className="object-cover object-[center_42%]" />
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-[45%] flex items-center justify-center p-8 md:p-12 lg:p-20 bg-white">
          <div className="w-full max-w-md">

            {/* General Server Error Display */}
            {serverError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                {serverError}
              </div>
            )}

            {/* ========================================= */}
            {/* VIEW 1: SIGNUP FORM                       */}
            {/* ========================================= */}
            {step === "SIGNUP" && (
              <>
                <div className="mb-8 text-left">
                  <h1 className="text-2xl md:text-4xl font-bold text-secondary tracking-tight mb-3">Hello!, I am Claire.</h1>
                  <p className="text-xl md:text-lg text-gray-500 font-normal">Welcome! I&apos;ll help you on this journey!</p>
                </div>

                <form onSubmit={handleSubmit(onSubmitSignup)} className="space-y-5" noValidate>
                  {/* Full Name */}
                  <div>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Full name"
                      className={`w-full px-5 py-3.5 bg-gray-50 border text-gray-900 text-lg rounded-xl outline-none transition-all placeholder-gray-400 ${errors.name ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:ring-2 focus:ring-secondary"}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1.5 ml-1">{errors.name.message}</p>}
                  </div>

                  {/* Email Address */}
                  <div>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Email address"
                      className={`w-full px-5 py-3.5 bg-gray-50 border text-gray-900 text-lg rounded-xl outline-none transition-all placeholder-gray-400 ${errors.email ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:ring-2 focus:ring-secondary"}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1.5 ml-1">{errors.email.message}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <PhoneInput
                          country={"in"}
                          value={value}
                          onChange={onChange}
                          enableSearch={true}
                          disableSearchIcon={true}
                          searchPlaceholder="Search country..."
                          containerClass="w-full relative"
                          inputClass={`!w-full !px-5 !py-7.5 !pl-[3.5rem] !bg-gray-50 !border !text-gray-900 !text-lg !rounded-xl !outline-none !transition-all !placeholder-gray-400 ${errors.phone ? "!border-red-500 focus:!ring-2 focus:!ring-red-500" : "!border-gray-200 focus:!ring-2 focus:!ring-secondary"}`}
                          buttonClass={`!bg-gray-50 !border-gray-200 !rounded-l-xl !border-r-0 ${errors.phone ? "!border-red-500" : ""}`}
                          dropdownClass="!rounded-xl !shadow-xl !border-gray-100"
                        />
                      )}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1.5 ml-1">{errors.phone.message}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <div className="relative w-full">
                      <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={`w-full px-5 py-3.5 pr-12 bg-gray-50 border text-gray-900 text-lg rounded-xl outline-none transition-all placeholder-gray-400 ${errors.password ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:ring-2 focus:ring-secondary"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-secondary transition-colors focus:outline-none"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1.5 ml-1 leading-tight">{errors.password.message}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <input
                      {...register("confirm_password")}
                      type="password"
                      placeholder="Confirm Password"
                      className={`w-full px-5 py-3.5 bg-gray-50 border text-gray-900 text-lg rounded-xl outline-none transition-all placeholder-gray-400 ${errors.confirm_password ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:ring-2 focus:ring-secondary"}`}
                    />
                    {errors.confirm_password && <p className="text-red-500 text-sm mt-1.5 ml-1">{errors.confirm_password.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 cursor-pointer text-brand text-lg md:text-xl border-brand border-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Processing..." : "Create Account"}
                    </button>
                  </div>

                  <div className="text-center mt-6 text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-brand font-semibold transition-colors hover:underline">
                      Log In
                    </Link>
                  </div>
                </form>
              </>
            )}

            {/* ========================================= */}
            {/* VIEW 2: OTP VERIFICATION FORM             */}
            {/* ========================================= */}
            {step === "OTP" && (
              <>
                <div className="mb-8 text-left">
                  <h1 className="text-2xl md:text-4xl font-bold text-secondary tracking-tight mb-3">Verify Your Email</h1>
                  <p className="text-xl md:text-lg text-gray-500 font-normal">
                    We&apos;ve sent a verification code to <span className="font-semibold text-gray-800">{registeredEmail}</span>.
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 text-gray-900 text-center tracking-[0.5em] text-2xl font-bold rounded-xl focus:ring-2 focus:ring-secondary outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={otpLoading || otp.length < 6}
                    className="w-full py-3.5 px-4 font-bold bg-brand text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 cursor-pointer text-lg md:text-xl rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {otpLoading ? "Verifying..." : "Verify & Continue"}
                  </button>
                </form>

                <div className="text-center mt-8 text-gray-600">
                  Didn&apos;t receive the code?{' '}
                  {timeLeft > 0 ? (
                    <span className="text-gray-400 font-semibold inline-block min-w-[120px]">
                      Resend in {timeLeft}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-brand font-semibold transition-colors hover:underline inline-block min-w-[120px]"
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