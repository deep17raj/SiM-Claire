import React from 'react';
import Link from 'next/link';
import { 
  Search, Smartphone, Download, BadgeCheck, Receipt, Map, 
  CreditCard, XCircle, Wrench, ChevronRight, MessageCircle, 
  Mail, LifeBuoy, FileText, ArrowRight
} from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';

// 🌟 1. ADD STATIC SEO METADATA
export const metadata = {
  title: "Help Center & eSIM Support | SimClaire",
  description: "Need help with your travel eSIM? Find step-by-step installation guides, troubleshooting tips, device compatibility lists, and answers to common FAQs.",
  alternates: {
    canonical: "https://simclaire.com/support",
  }
};

export default function SupportPage() {
  const popularFaqs = [
    {
      question: "How to install an eSIM on iOS (iPhone/iPad)",
      answer: "Go to Settings > Cellular > Add eSIM. Select 'Use QR Code' and scan the code sent to your email. Follow the on-screen prompts to label your new plan (e.g., 'Travel') and set it as the primary line for Cellular Data."
    },
    {
      question: "What is the fair usage policy (FUP)?",
      answer: "FUP is a network policy to ensure equal speeds for all users. If you use an excessive amount of data (e.g., over 5GB/day on an Unlimited plan), your speed might be temporarily reduced by the local carrier to prevent network congestion."
    },
    {
      question: "Can I use my eSIM in multiple countries?",
      answer: "It depends on your plan. 'Single Country' plans work only in that specific location. 'Regional' (e.g., Europe) and 'Global' plans allow roaming across multiple supported countries without changing settings."
    },
    {
      question: "My data is not working, what should I do?",
      answer: "First, ensure 'Data Roaming' is turned ON for your SiMClaire line. Second, check that your APN settings are correct (usually automatic). Finally, try toggling Airplane Mode on and off to reset the network connection."
    }
  ];

  // 🌟 2. BUILD THE INVISIBLE FAQ SCHEMA FOR GOOGLE
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": popularFaqs.map((faq) => ({
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

      <div className='px-4 py-6'>
        <div className="w-full max-w-350 mx-auto rounded-2xl bg-bget min-h-screen text-slate-900">
          
          {/* 1. Hero Search Section */}
          <section className="relative py-8 md:py-10 px-4 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary rounded-full blur-[120px]"></div>
              <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-secondary rounded-full blur-[100px]"></div>
            </div>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl md:text-4xl font-bold text-secondary tracking-tight">
                How can we help you today?
              </h1>
            </div>
          </section>

          {/* 2. FAQ Category Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 rounded-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/support/device-compatibility">
                <CategoryCard icon={<Smartphone size={32} />} title="Device Compatibility" count="12 Articles" desc="Check if your smartphone supports eSIM." />
              </Link>
              <Link href="/support/installation-activation">
                <CategoryCard icon={<Download size={32} />} title="Installation & Activation" count="24 Articles" desc="Guides for QR code and manual setup." />
              </Link>
              <Link href="/support/kyc-process">
                <CategoryCard icon={<BadgeCheck size={32} />} title="KYC Process" count="8 Articles" desc="Identity verification requirements." />
              </Link>
              <Link href="/support/post-purchase">
                <CategoryCard icon={<Receipt size={32} />} title="Post Purchase" count="15 Articles" desc="Manage active plans and top-ups." />
              </Link>
              <Link href="/support/pre-purchase">
                <CategoryCard icon={<Map size={32} />} title="Pre-Purchase" count="10 Articles" desc="Coverage maps and network speeds." />
              </Link>
              <Link href="/support/purchase-journey">
                <CategoryCard icon={<CreditCard size={32} />} title="Purchase Journey" count="6 Articles" desc="Payment methods and checkout help." />
              </Link>
              <Link href="/support/refunds-cancellations">
                <CategoryCard icon={<XCircle size={32} />} title="Refunds & Cancellations" count="9 Articles" desc="Our policy on returns and refunds." />
              </Link>
              <Link href="/support/troubleshooting">
                <CategoryCard icon={<Wrench size={32} />} title="Troubleshooting" count="31 Articles" desc="Fixes for connection and data errors." />
              </Link>
            </div>
          </section>

          {/* 3. Popular Articles Section */}
          <section className="rounded-2xl pb-6 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-2xl">
              <div className="flex flex-col md:flex-row gap-16">
                
                {/* Left Side Info */}
                <div className="md:w-1/3 mt-8">
                  <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-6">Popular FAQS</h2>
                  <p className="text-slate-600 subheading mb-5">Quick access to the most frequently requested information.</p>
                  
                  <div className="bg-secondary/5 border border-secondary/10 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <BadgeCheck className="text-brand" size={24} />
                      <span className="font-bold text-secondary">New to eSIM?</span>
                    </div>
                    <p className="text-sm text-slate-600">Read our complete beginner&apos;s guide to digital mobile connectivity.</p>
                  </div>
                </div>

                {/* Right Side Links */}
                <div className="md:w-2/3 mt-8">
                  <div className="flex flex-col gap-4">
                    {popularFaqs.map((faq, index) => (
                      <div key={index} className="border border-slate-100 rounded-xl overflow-hidden hover:border-brand/30 transition-colors shadow-sm">
                        <FAQAccordion question={faq.question} answer={faq.answer} />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

const CategoryCard = ({ icon, title, count, desc }) => (
  <div className="h-full bg-white/80 backdrop-blur-sm border border-secondary/10 p-6 rounded-2xl hover:-translate-y-1 transition-all cursor-pointer group shadow-sm hover:shadow-xl hover:shadow-brand/10 flex flex-col">
    <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-secondary/20 group-hover:scale-110 group-hover:bg-brand transition-all duration-300">
      <div className="text-white">{icon}</div>
    </div>
    <h3 className="subheading sec font-bold text-secondary mb-2 ">{title}</h3>
    <p className="text-sm text-slate-600 leading-relaxed flex-grow">{desc}</p>
    <div className="mt-4 text-xs font-bold text-brand uppercase tracking-wider">{count}</div>
  </div>
);