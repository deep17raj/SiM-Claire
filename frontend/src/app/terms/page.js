import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/" className="inline-flex items-center gap-2 text-[#077770] hover:text-[#ec5b13] font-medium transition-colors mb-8">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Terms and Conditions</h1>
          <p className="text-sm font-medium text-slate-500 mb-10">Last Updated: February 19, 2026</p>

          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8">
            <p>
              By using the services provided by SiMClaire ("the Company," "we," "us," or "our") via simclaire.com, you agree to be bound by the following Terms and Conditions. Please read them carefully before making a purchase.
            </p>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">1. Service Description & Eligibility</h2>
              <p className="mb-2">SiMClaire provides digital connectivity solutions, including but not limited to eSIM profiles and related data services.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Compatibility:</strong> It is the Customer’s sole responsibility to ensure their device is eSIM-compatible and carrier-unlocked. We maintain a list of compatible devices on our site, but we do not guarantee its exhaustiveness.</li>
                <li><strong>Age:</strong> You must be at least 18 years old or have legal parental consent to use this service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">2. Payments and Fraud Prevention</h2>
              <p className="mb-2">To protect our platform and customers, we implement strict payment security measures.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Verification:</strong> All payments are processed via Stripe. We reserve the right to trigger 3D Secure (3DS) authentication or request additional identity verification for high-risk transactions.</li>
                <li><strong>Billing Descriptor:</strong> Charges will appear on your bank statement as <code>SIMCLAIRE.COM</code>. Unrecognized charge claims filed with your bank ("Friendly Fraud") will be contested with evidence of digital delivery and IP logs.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">3. Cancellation and Refund Policy</h2>
              <p className="mb-2">Due to the nature of digital products, our refund policy is strictly limited:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Unactivated eSIMs:</strong> A full refund may be requested within 30 days of purchase only if the eSIM has not been installed or activated on any device.</li>
                <li><strong>Technical Issues:</strong> If a service failure occurs due to an error on our part, we will first attempt to resolve the issue within 48 hours. If we cannot provide the service, a refund or credit will be issued.</li>
                <li><strong>Non-Refundable Scenarios:</strong> No refunds will be issued for devices locked to a specific carrier, devices that do not support eSIM technology, unused data remaining after the plan’s validity period expires, or accidental deletions of the eSIM profile from the device.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">4. Usage Policy (Acceptable Use)</h2>
              <p className="mb-2">The Customer agrees not to use the service for:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Any illegal, fraudulent, or abusive activities.</li>
                <li>Reselling the data plan without express written consent from SiMClaire.</li>
                <li>Activities that place an "unreasonable load" on the network infrastructure.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">5. Limitation of Liability</h2>
              <p className="mb-2">To the maximum extent permitted by law (including 2026 Consumer Protection standards), SiMClaire shall not be liable for:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Any indirect, incidental, or consequential damages (e.g., loss of business or roaming charges from other providers).</li>
                <li><strong>Maximum Liability:</strong> Our total liability for any claim shall not exceed the amount paid by the Customer for the specific service in question.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">6. Dispute Resolution</h2>
              <p className="mb-2">Before contacting your bank or filing a chargeback, you agree to contact SiMClaire Support to resolve any issues.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Chargeback Consequences:</strong> Filing a fraudulent chargeback may result in the immediate permanent blacklisting of your device ID and account from our network and partner networks.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}