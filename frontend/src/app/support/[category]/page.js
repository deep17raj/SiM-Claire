import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { categories } from '@/data/supportData';
import FAQAccordion from '@/components/FAQAccordion'; 

// 🌟 1. DYNAMIC METADATA GENERATION
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.category;
  const categoryData = categories[slug];

  if (!categoryData) {
    return { title: 'Category Not Found | SimClaire Support' };
  }

  return {
    title: `${categoryData.title} Support & FAQs | SimClaire`,
    description: categoryData.description,
    alternates: {
      canonical: `https://simclaire.com/support/${slug}`,
    }
  };
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.category;
  
  const categoryData = categories[slug];

  if (!categoryData) {
    return notFound();
  }

  // 🌟 2. DYNAMIC INVISIBLE FAQ SCHEMA FOR GOOGLE
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": categoryData.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* 🌟 3. INJECT SCHEMA INTO THE HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-[#fafafa] min-h-screen text-slate-900 pb-20">
        
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
                      <p className="text-white/80 subheading">{categoryData.description}</p>
                  </div>
              </div>
           </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-20">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
              {/* FAQ List */}
              <div className="divide-y divide-slate-100">
                  {categoryData.faqs.map((faq, index) => (
                      <FAQAccordion key={index} question={faq.question} answer={faq.answer} />
                  ))}
              </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-500 mb-4 subheading">Didn&apos;t find what you were looking for?</p>
          <Link href="/contact">
              <button className="text-secondary subheading font-bold hover:text-brand transition-colors underline decoration-2 underline-offset-4 cursor-pointer">
                  Contact our Support Team
              </button>
          </Link>
        </div>

      </div>
    </>
  );
}