import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Search } from 'lucide-react';
import { categories } from '@/data/supportData';
import FAQAccordion from '@/components/FAQAccordion'; // Import the client component

// 1. Made function async
// 2. Removed "use client"
export default async function CategoryPage({ params }) {
  
  // 3. Await the params promise (Fix for Next.js 15)
  const resolvedParams = await params;
  const slug = resolvedParams.category;
  
  const categoryData = categories[slug];

  if (!categoryData) {
    return notFound();
  }

  return (
    <div className="bg-[#fafafa] min-h-screen  text-slate-900 pb-20">
      
      {/* Header Section */}
      <div className="bg-secondary text-white pt-12 pb-24 px-4 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
         
         <div className="max-w-4xl mx-auto relative z-10">
            <Link href="/support" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors text-sm font-medium">
                <ArrowLeft size={16} className="mr-2" /> Back to Support
            </Link>

            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
                    <div className="text-brand">
                        {categoryData.icon}
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold mb-2">{categoryData.title}</h1>
                    <p className="text-white/80 text-lg">{categoryData.description}</p>
                </div>
            </div>
         </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
            
            {/* Static Search UI (Visual only) */}
            {/* <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="relative">
                    <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder={`Search within ${categoryData.title}...`}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all"
                    />
                </div>
            </div> */}

            {/* FAQ List */}
            <div className="divide-y divide-slate-100">
                {categoryData.faqs.map((faq, index) => (
                    // Using the Client Component here
                    <FAQAccordion key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <p className="text-slate-500 mb-4">Didn&apos;t find what you were looking for?</p>
        <Link href="/contact">
            <button className="text-secondary font-bold hover:text-brand transition-colors underline decoration-2 underline-offset-4">
                Contact our Support Team
            </button>
        </Link>
      </div>

    </div>
  );
}