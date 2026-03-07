// app/checkout/success/page.jsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PartyPopper, MailCheck, QrCode, ArrowRight } from "lucide-react";

// --- META DATA (Keep Google from indexing this page) ---


// --- ANIMATION CONFIGURATIONS ---

// 1. The main container "stagger" effect (elements pop in one by one)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each child animating
      delayChildren: 0.3,   // Initial delay before first child starts
    },
  },
};

// 2. Standard "Pop In" effect for text and buttons
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

// 3. 🌟 MASCOT (BEAVER) ANIMATION 🌟
// This makes the asset scale up, rotate playfully, and bounce slightly.
const mascotVariants = {
  hidden: { scale: 0, rotate: -180, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10,
      delay: 0.2,
    },
  },
  hover: {
    scale: 1.1,
    rotate: [0, 5, -5, 0], // Playful wiggle on hover
    transition: { duration: 0.5 },
  },
};

// 4. Confetti/Popper Icon Animation (Scale and Fade)
const popperVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.2, 1],
    opacity: 1,
    transition: { delay: 0.8, duration: 0.5 },
  },
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans pt-28 pb-20 px-4">
      <motion.div
        className="max-w-3xl mx-auto bg-white p-8 md:p-14 rounded-[32px] shadow-lg shadow-brand/5 border border-slate-100 text-center relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        
        {/* Decorative background circle */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-brand/5 rounded-full blur-3xl opacity-70"></div>

        {/* 🌟 1. ANIMATED BEAVER MASCOT AREA 🌟 */}
        <motion.div
          className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-10 cursor-pointer"
          variants={mascotVariants}
          whileHover="hover"
        >
          {/* Circular background for the mascot */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-orange-50 rounded-full shadow-inner border border-brand/10"></div>
          
          {/* --- PLACEHOLDER: Your Beaver Asset Goes Here --- */}
          {/* When you have your Beaver asset (SVG, PNG, or Lottie JSON):
            1. Delete the <QrCode /> icon below.
            2. Add your <Image src="/beaver.png" ... /> or <Lottie ... /> component here.
            3. Ensure it has className="relative z-10 w-full h-full object-contain p-4"
          */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-6 text-brand">
            <QrCode size={80} strokeWidth={1.5} />
          </div>
          
          {/* Little animated party popper icon attached to the mascot */}
          <motion.div 
            className="absolute -top-2 -right-2 bg-white p-3 rounded-full shadow-lg border border-slate-100 text-brand"
            variants={popperVariants}
          >
            <PartyPopper size={28} />
          </motion.div>
        </motion.div>


        {/* 2. SUCCESS MESSAGE AREA */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-extrabold hcol mb-4 tracking-tight">
            Woohoo! <span className="text-brand">You're All Set!</span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 font-medium max-w-xl mx-auto leading-relaxed">
            Your SimClaire eSIM purchase was successful. Get ready for seamless connectivity on your trip!
          </p>
        </motion.div>


        {/* 3. "WHAT'S NEXT" INSTRUCTIONS AREA */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-14"
          variants={itemVariants}
        >
          {/* Step A: Check Email */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-brand shrink-0 mt-1">
              <MailCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-1">Check Your Inbox</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                We just sent your QR code and activation instructions to your email address. It should arrive within 2 minutes.
              </p>
            </div>
          </div>

          {/* Step B: Scan QR */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-brand shrink-0 mt-1">
              <QrCode size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-1">Scan & Activate</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Open the email on another device, scan the QR code with your phone's camera, and follow the simple prompts to install.
              </p>
            </div>
          </div>
        </motion.div>


        {/* 4. CALL TO ACTION BUTTONS */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8 border-t border-slate-100"
          variants={itemVariants}
        >
          <Link 
            href="/destination"
            className="w-full sm:w-auto text-brand text-lg border-brand border-2 rounded-xl px-12 py-4 font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 duration-300 cursor-pointer"
          >
            Buy Another eSIM
          </Link>
          <Link 
            href="/support"
            className="w-full sm:w-auto text-center px-10 py-4 font-bold bg-slate-900 text-white rounded-xl text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2.5 active:scale-95 duration-300 cursor-pointer"
          >
            Need Help? Visit Support <ArrowRight size={18} />
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}