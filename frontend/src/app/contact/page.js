'use client'; // <--- This makes it a Next.js Client Component

import { useState } from 'react';

const ContactForm = () => {
  // Simple state to handle form submission loading (optional but good for UX)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    console.log("Form submitted!");
    
    setTimeout(() => {
        setIsSubmitting(false);
        alert("Message sent!");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#fdfdfd] text-slate-800 relative overflow-hidden font-sans">
      
      {/* Background Decoration (Wave Pattern) */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_2px_2px,rgba(242,103,28,0.05)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      
      {/* Bottom Wave SVG */}
      <div className="fixed inset-x-0 bottom-0 pointer-events-none -z-10 text-brand opacity-5">
         <svg className="w-full h-auto" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,122.7C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
         </svg>
      </div>

      <main className="w-full max-w-2xl bg-white shadow-2xl shadow-slate-200/50 rounded-2xl border border-slate-100 overflow-hidden relative">
        <div className="p-8 md:p-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-50 rounded-full mb-4 text-secondary">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Get in touch with us</h1>
            <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
              For assistance, please contact{' '}
              {/* Note: Use standard <a> for mailto links, Link is only for internal pages */}
              <a href="mailto:support@simclaire.com" className="text-brand font-medium hover:underline">
                support@simclaire.com
              </a>{' '}
              or submit your inquiry using the form below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="relative z-0 w-full group">
                <input 
                    type="text" 
                    name="fullname" 
                    id="fullname" 
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                    placeholder=" " 
                    required 
                />
                <label htmlFor="fullname" className="peer-focus:font-medium absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Full Name*
                </label>
              </div>

              {/* Email Address */}
              <div className="relative z-0 w-full group">
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                    placeholder=" " 
                    required 
                />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Email Address*
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Phone Number */}
              <div className="flex items-end gap-3">
                <div className="flex items-center gap-1 border-b-2 border-slate-200 pb-2.5 mb-[1px]">
                    <span className="text-xl">🇮🇳</span>
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                <div className="relative z-0 w-full group">
                    <input 
                        type="tel" 
                        name="phone" 
                        id="phone" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                        placeholder=" " 
                    />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Phone Number
                    </label>
                </div>
              </div>

              {/* Device Model */}
              <div className="relative z-0 w-full group">
                <input 
                    type="text" 
                    name="device" 
                    id="device" 
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                    placeholder=" " 
                />
                <label htmlFor="device" className="peer-focus:font-medium absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Device (e.g. iPhone 14)
                </label>
              </div>
            </div>

            {/* eSIM ICCID */}
            <div className="relative z-0 w-full group">
                <div className="absolute right-0 top-3 text-slate-400 hover:text-brand cursor-help group/tooltip z-10">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none">
                        Find this 19-20 digit number in your eSIM settings.
                    </div>
                </div>
                <input 
                    type="text" 
                    name="iccid" 
                    id="iccid" 
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                    placeholder=" " 
                />
                <label htmlFor="iccid" className="peer-focus:font-medium absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    eSIM ICCID
                </label>
            </div>

            {/* Message Area */}
            <div className="relative z-0 w-full group">
                <textarea 
                    name="message" 
                    id="message" 
                    rows="4" 
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer resize-none" 
                    placeholder=" " 
                    required 
                ></textarea>
                <label htmlFor="message" className="peer-focus:font-medium absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Your Message*
                </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-center">
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="group relative px-10 py-3 font-semibold text-brand border-2 border-brand rounded-lg overflow-hidden transition-all duration-300 hover:text-white cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <span className={`absolute inset-0 w-0 bg-brand transition-all duration-300 ease-out ${isSubmitting ? 'w-full' : 'group-hover:w-full'}`}></span>
                    <span className="relative flex items-center gap-2">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        {!isSubmitting && (
                          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        )}
                    </span>
                </button>
            </div>
          </form>
        </div>

        {/* Footer Info inside Card */}
        <div className="bg-slate-50 py-4 px-8 text-center border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Typical response time: <span className="font-medium text-slate-600">Under 24 hours</span>
          </p>
        </div>
      </main>

      <footer className="mt-8 text-slate-400 text-sm">
        © 2026 SiMClaire. All rights reserved.
      </footer>
    </div>
  );
};

export default ContactForm;