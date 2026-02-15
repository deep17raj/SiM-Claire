import React from 'react';
import { 
  Search, 
  Smartphone, 
  Download, 
  BadgeCheck, 
  Receipt, 
  Map, 
  CreditCard, 
  XCircle, 
  Wrench, 
  ArrowRight, 
  ChevronRight, 
  MessageCircle, 
  Mail, 
  LifeBuoy, 
  FileText 
} from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="bg-[#fafafa] min-h-screen font-sans text-slate-900">
      
      {/* 1. Hero Search Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Blobs (Teal) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-secondary rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6 tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-lg text-slate-600 mb-10">
            Search our knowledge base for instant answers to your eSIM questions.
          </p>

          {/* Search Bar */}
          <div className="relative group rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="text-slate-400 group-focus-within:text-brand transition-colors" size={24} />
            </div>
            <input 
              className="block w-full pl-14 pr-4 py-5 bg-white border border-slate-200 rounded-2xl leading-5 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all text-lg" 
              placeholder="Search for articles, setup guides, or troubleshooting..." 
              type="text"
            />
          </div>

          {/* Popular Tags */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-slate-500 py-1">Popular:</span>
            <a className="text-sm font-medium text-secondary hover:text-brand hover:underline px-2 py-1 transition-colors" href="#">iPhone Setup</a>
            <a className="text-sm font-medium text-secondary hover:text-brand hover:underline px-2 py-1 transition-colors" href="#">Refund Policy</a>
            <a className="text-sm font-medium text-secondary hover:text-brand hover:underline px-2 py-1 transition-colors" href="#">Data Balance</a>
          </div>
        </div>
      </section>

      {/* 2. FAQ Category Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-secondary">Browse by Category</h2>
          <a className="text-secondary font-semibold text-sm flex items-center gap-1 hover:text-brand hover:gap-2 transition-all" href="#">
             View all categories <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Categories */}
          <CategoryCard icon={<Smartphone size={32} />} title="Device Compatibility" count="12 Articles" desc="Check if your smartphone supports eSIM." />
          <CategoryCard icon={<Download size={32} />} title="Installation & Activation" count="24 Articles" desc="Guides for QR code and manual setup." />
          <CategoryCard icon={<BadgeCheck size={32} />} title="KYC Process" count="8 Articles" desc="Identity verification requirements." />
          <CategoryCard icon={<Receipt size={32} />} title="Post Purchase" count="15 Articles" desc="Manage active plans and top-ups." />
          <CategoryCard icon={<Map size={32} />} title="Pre-Purchase" count="10 Articles" desc="Coverage maps and network speeds." />
          <CategoryCard icon={<CreditCard size={32} />} title="Purchase Journey" count="6 Articles" desc="Payment methods and checkout help." />
          <CategoryCard icon={<XCircle size={32} />} title="Refunds & Cancellations" count="9 Articles" desc="Our policy on returns and refunds." />
          <CategoryCard icon={<Wrench size={32} />} title="Troubleshooting" count="31 Articles" desc="Fixes for connection and data errors." />
        </div>
      </section>

      {/* 3. Popular Articles Section */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16">
            
            {/* Left Side Info */}
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold text-secondary mb-6">Popular Articles</h2>
              <p className="text-slate-600 mb-8">Quick access to the most frequently requested information.</p>
              
              <div className="bg-secondary/5 border border-secondary/10 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <BadgeCheck className="text-brand" size={24} />
                  <span className="font-bold text-secondary">New to eSIM?</span>
                </div>
                <p className="text-sm text-slate-600">Read our complete beginner's guide to digital mobile connectivity.</p>
              </div>
            </div>

            {/* Right Side Links */}
            <div className="md:w-2/3 grid gap-4">
              <ArticleLink title="How to install an eSIM on iOS (iPhone/iPad)" />
              <ArticleLink title="What is the fair usage policy (FUP)?" />
              <ArticleLink title="Can I use my eSIM in multiple countries?" />
              <ArticleLink title="My data is not working, what should I do?" />
            </div>

          </div>
        </div>
      </section>

      {/* 4. Support CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-secondary rounded-[2rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-secondary/20">
          
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Still need help?</h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Our support experts are available 24/7 to help you with any issues. 
            Average response time is under 2 minutes.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <button className="bg-white text-secondary px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              <MessageCircle size={20} /> Start Live Chat
            </button>
            <button className="bg-secondary/30 border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Mail size={20} /> Email Support
            </button>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="border-t border-slate-100 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-8 mb-8">
            <a className="text-slate-500 hover:text-brand text-sm font-medium transition-colors" href="#">Terms of Service</a>
            <a className="text-slate-500 hover:text-brand text-sm font-medium transition-colors" href="#">Privacy Policy</a>
            <a className="text-slate-500 hover:text-brand text-sm font-medium transition-colors" href="#">Refund Policy</a>
          </div>
          <p className="text-slate-400 text-xs">© 2026 SiMClaire Support Center. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Widget */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center shadow-2xl shadow-brand/40 hover:scale-110 hover:bg-[#e0a81a] transition-all">
          <LifeBuoy size={32} />
        </button>
      </div>

    </div>
  );
}

// --- Sub-Components for cleaner code ---

const CategoryCard = ({ icon, title, count, desc }) => (
  <div className="bg-white/80 backdrop-blur-sm border border-secondary/10 p-6 rounded-2xl hover:-translate-y-1 transition-all cursor-pointer group shadow-sm hover:shadow-xl hover:shadow-brand/10">
    <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-secondary/20 group-hover:scale-110 group-hover:bg-brand transition-all duration-300">
      <div className="text-white">
        {icon}
      </div>
    </div>
    <h3 className="text-lg font-bold text-secondary mb-2">{title}</h3>
    <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    <div className="mt-4 text-xs font-bold text-brand uppercase tracking-wider">{count}</div>
  </div>
);

const ArticleLink = ({ title }) => (
  <a className="flex items-center justify-between p-5 rounded-xl border border-slate-100 hover:border-brand/50 transition-all group bg-[#f8f6f6] hover:bg-white hover:shadow-md cursor-pointer">
    <div className="flex items-center gap-4">
      <FileText className="text-slate-400 group-hover:text-brand transition-colors" size={24} />
      <span className="font-medium text-slate-700 group-hover:text-secondary">{title}</span>
    </div>
    <ChevronRight className="text-slate-300 group-hover:text-brand transition-all" size={20} />
  </a>
);