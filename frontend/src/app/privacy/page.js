import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/" className="inline-flex items-center gap-2 text-[#077770] hover:text-[#ec5b13] font-medium transition-colors mb-8">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Global Privacy Policy</h1>
          <p className="text-sm font-medium text-slate-500 mb-10">Effective Date: February 19, 2026</p>

          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8">
            <p>
              At SiMClaire, we respect your privacy and are committed to protecting your personal data. This Global Privacy Policy explains how we handle your information when you visit simclaire.com, regardless of where you are located. It incorporates GDPR (Europe), CCPA/CPRA (California/USA), and the Data (Use and Access) Act (UK).
            </p>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">1. Data We Collect</h2>
              <p className="mb-2">As a global e-commerce provider, we collect data to fulfill orders and improve your experience:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Identity & Contact Data:</strong> Name, email address, and phone number.</li>
                <li><strong>Transaction Data:</strong> Details about payments (processed securely via Stripe) and products you have purchased.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, time zone settings, and device IDs (essential for eSIM provisioning).</li>
                <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">2. Legal Basis for Processing</h2>
              <p className="mb-2">We only process your data when we have a legal ground to do so:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Contractual Necessity:</strong> To deliver your eSIM and process payments.</li>
                <li><strong>Consent:</strong> For marketing communications (which you can withdraw at any time).</li>
                <li><strong>Legitimate Interests:</strong> To prevent fraud (via Stripe Radar) and improve our site security.</li>
                <li><strong>Legal Obligation:</strong> To comply with tax laws and regulatory requirements in your jurisdiction.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">3. International Data Transfers</h2>
              <p className="mb-2">Since we operate a global e-commerce platform, your data may be transferred outside of your home country (e.g., to servers in the US or Canada).</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Safeguards:</strong> We use Standard Contractual Clauses (SCCs) approved by the European Commission and other regulatory bodies to ensure your data receives the same level of protection worldwide.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">4. Your Global Privacy Rights</h2>
              <p className="mb-2">Depending on your location, you have the following rights:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Access & Portability:</strong> Request a copy of the data we hold about you.</li>
                <li><strong>Correction & Erasure:</strong> Request that we fix or delete your data ("Right to be Forgotten").</li>
                <li><strong>Opt-Out (CCPA/CPRA):</strong> You have the right to opt-out of the "sale" or "sharing" of your personal info. <em>Note: SiMClaire does not sell your personal data to third parties.</em></li>
                <li><strong>Automated Decision-Making:</strong> You have the right to contest a payment block if it was triggered by an automated fraud filter.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">5. Security & Fraud Prevention</h2>
              <p className="mb-2">To protect simclaire.com from chargebacks and unauthorized access:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>We use TLS/SSL encryption for all data in transit.</li>
                <li>We utilize Stripe Radar for real-time fraud detection.</li>
                <li>We do not store raw credit card numbers on our servers; all payment data is handled by PCI-DSS compliant processors.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">6. Retention of Data</h2>
              <p>We keep your personal data only as long as necessary to provide services and for legal/tax purposes (typically 7 years for transaction records).</p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">7. Contact Us & DPO</h2>
              <p className="mb-2">If you have questions about this policy or wish to exercise your data rights, please contact our Data Protection Team:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Email:</strong> support@simclaire.com</li>
                <li><strong>Mailing Address:</strong> [Your Registered Business Address]</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}