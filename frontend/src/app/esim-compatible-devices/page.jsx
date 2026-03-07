// app/esim-compatible-devices/page.jsx

import SupportedDevicesClient from "./SupportedDevicesClient";

export const metadata = {
  title: "eSIM Compatible Devices List (2024 Update) | SimClaire",
  description: "Check if your iPhone, Samsung Galaxy, Google Pixel, or other smartphone supports eSIM technology. Search our full list of eSIM compatible phones.",
  alternates: {
    canonical: "https://simclaire.com/esim-compatible-devices",
  }
};

export default function CompatibleDevicesPage() {
  // 🌟 BUILD THE FAQ SCHEMA FOR GOOGLE
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does the iPhone 15 support eSIM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all models of the iPhone 15 (including Pro, Pro Max, and Plus) fully support eSIM technology. Models sold in the US are eSIM-only and do not have a physical SIM tray."
        }
      },
      {
        "@type": "Question",
        "name": "Is the Samsung Galaxy S24 eSIM compatible?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the entire Samsung Galaxy S24 series (S24, S24+, and S24 Ultra) supports eSIM, allowing you to use dual SIM functionality for travel."
        }
      },
      {
        "@type": "Question",
        "name": "Which Google Pixel phones use eSIM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Google Pixel phones from the Pixel 4 onwards, including the Pixel 6, 7, 8, and the new Pixel 9 series, all support eSIM technology."
        }
      },
      {
        "@type": "Question",
        "name": "How do I know if my phone is eSIM ready?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On iPhone, go to Settings > Cellular > Add eSIM. On Android, go to Settings > Connections > SIM Manager > Add eSIM. If you see this option, your phone is compatible."
        }
      }
    ]
  };

  return (
    <>
      {/* INJECT THE INVISIBLE FAQ SCHEMA FOR GOOGLE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* RENDER YOUR INTERACTIVE SEARCH UI */}
      <SupportedDevicesClient />
    </>
  );
}