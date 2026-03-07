// app/checkout/success/SuccessClientComponent.jsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MailCheck, QrCode, ArrowRight, Sparkles } from "lucide-react";

// --- ANIMATION CONFIGURATIONS ---

// 1. Staggered fade-up for the whole card on entry
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1], // Premium smooth easing curve
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// 2. The entry for rings around the checkmark
const ringVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 60, damping: 14, delay: 0.1 },
  },
};

// 🌟 CONTINUOUS ANIMATION: Slow rotating dashed ring 🌟
const rotatingRingVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20, // Very slow spin for premium feel
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// 3. 🌟 GREEN COLOR UPDATE: The continuous pulsing aura effect 🌟
const pulseVariants = {
  animate: {
    scale: [1, 1.15, 1],
    // Updated Opacity for green palette
    opacity: [0.5, 0.15, 0.5], 
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// 4. The Checkmark drawing itself
const checkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// 🌟 CONTINUOUS ANIMATION: Checkmark "Breathing" 🌟
// Makes the checkmark glow slightly infinitely
const checkBreatheVariants = {
  animate: {
    opacity: [1, 0.7, 1],
    filter: ["drop-shadow(0 0 0px rgba(255,255,255,0))", "drop-shadow(0 0 8px rgba(255,255,255,0.8))", "drop-shadow(0 0 0px rgba(255,255,255,0))"],
    transition: {
      delay: 1.5, // Start after drawing finishes
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// 5. Floating Sparkles (Continuous)
const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// 🌟 CONTINUOUS ANIMATION: Step Icon Pulse 🌟
const iconPulseVariants = {
    animate: {
        scale: [1, 1.1, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
        }
    }
}

export default function SuccessClientComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] to-slate-50 font-sans pt-8 pb-20 px-4 flex items-center justify-center overflow-hidden relative">
      
      {/* 🌟 GREEN COLOR UPDATE: Background Ambient Glows 🌟 */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        className="max-w-3xl w-full mx-auto bg-white/80 backdrop-blur-2xl p-8 md:p-14 rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/60 text-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        
        {/* 🌟 1. PREMIUM SUCCESS CENTERPIECE (Updated to Green) 🌟 */}
        <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-10 flex items-center justify-center">
          
          {/* 🌟 GREEN COLOR UPDATE: Continuous Pulsing Aura 🌟 */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full blur-2xl"
            variants={pulseVariants}
            animate="animate"
          />

          {/* 🌟 CONTINUOUS ANIMATION: Slow rotating dashed ring 🌟 */}
          {/* 🌟 GREEN COLOR UPDATE: Border color 🌟 */}
          <motion.div
            className="absolute inset-2 border-2 border-dashed border-emerald-500/30 rounded-full"
            variants={rotatingRingVariants}
            animate="animate"
          />
          
          {/* Standard outer ring entry animation */}
          <motion.div
            className="absolute inset-2 border border-emerald-500/20 rounded-full"
            variants={ringVariants}
          />

          {/* 🌟 GREEN COLOR UPDATE: Solid Inner Circle & Shadow 🌟 */}
          <motion.div
            className="relative z-10 w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-full shadow-2xl shadow-emerald-500/40 flex items-center justify-center"
            variants={ringVariants}
          >
            {/* Self-Drawing SVG Checkmark with continuous "breathe" */}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14 md:w-16 md:h-16 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              // 🌟 CONTINUOUS ANIMATION applied here 🌟
              animate="animate" 
              variants={checkBreatheVariants}
            >
              <motion.path
                d="M20 6 9 17l-5-5"
                variants={checkVariants} // Entry animation
              />
            </motion.svg>
          </motion.div>

          {/* 🌟 GREEN COLOR UPDATE: Floating Sparkle 1 🌟 */}
          <motion.div 
            className="absolute top-2 right-2 text-teal-400"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "0.2s" }}
          >
            <Sparkles size={24} strokeWidth={1.5} />
          </motion.div>

          {/* 🌟 GREEN COLOR UPDATE: Floating Sparkle 2 🌟 */}
          <motion.div 
            className="absolute bottom-4 left-0 text-emerald-500/60"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "1s" }}
          >
            <Sparkles size={20} strokeWidth={1.5} />
          </motion.div>
        </div>


        {/* 2. SUCCESS MESSAGE AREA */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {/* 🌟 GREEN COLOR UPDATE: Gradient Text 🌟 */}
            Payment <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Successful</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-12 font-medium max-w-xl mx-auto leading-relaxed">
            Your SimClaire eSIM is ready. Your gateway to seamless global connectivity is just a scan away.
          </p>
        </motion.div>


        {/* 3. "WHAT'S NEXT" INSTRUCTIONS AREA */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-14"
          variants={itemVariants}
        
        >
          {/* Step A: Check Email */}
          <div className="bg-white/60 backdrop-blur-md border border-slate-100 p-6 rounded-[24px] shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start gap-5">
            {/* 🌟 GREEN COLOR UPDATE: Icon Container 🌟 */}
            {/* 🌟 CONTINUOUS ANIMATION: Pulsing Icon 🌟 */}
            <motion.div 
                className="p-3.5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 text-emerald-600 shrink-0"
                animate="animate"
                variants={iconPulseVariants}
            >
              <MailCheck size={26} strokeWidth={1.5} />
            </motion.div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-1.5">Check Your Inbox</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Your QR code and detailed activation guide have been securely delivered to your email.
              </p>
            </div>
          </div>

          {/* Step B: Scan QR */}
          <div className="bg-white/60 backdrop-blur-md border border-slate-100 p-6 rounded-[24px] shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start gap-5">
            {/* 🌟 GREEN COLOR UPDATE: Icon Container 🌟 */}
            {/* 🌟 CONTINUOUS ANIMATION: Pulsing Icon 🌟 */}
            <motion.div 
                className="p-3.5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 text-emerald-600 shrink-0"
                animate="animate"
                variants={iconPulseVariants}
            >
              <QrCode size={26} strokeWidth={1.5} />
            </motion.div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-1.5">Scan & Activate</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Open the email on another screen, scan the code with your phone camera, and install in seconds.
              </p>
            </div>
          </div>
        </motion.div>


        {/* 4. CALL TO ACTION BUTTONS */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-slate-100"
          variants={itemVariants}
        >
          <Link 
            href="/destination"
            className="w-full sm:w-auto text-slate-700 bg-white border border-slate-200 shadow-sm rounded-2xl px-10 py-4 font-bold hover:bg-slate-50 transition-all transform active:scale-95 duration-200 cursor-pointer"
          >
            Buy Another eSIM
          </Link>
          <Link 
            href="/support"
            className="w-full sm:w-auto text-center px-10 py-4 font-bold bg-slate-900 text-white shadow-xl shadow-slate-900/20 rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2.5 active:scale-95 duration-200 cursor-pointer group"
          >
            Installation Guide 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}