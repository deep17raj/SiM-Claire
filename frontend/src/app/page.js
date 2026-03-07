import CompatibilityBanner from "@/components/CompatibilityBanner";
import Destinations from "@/components/Destinations";
import TrustedBy from "@/components/TrustedBy";
import Image from "next/image";
import Hero from "@/components/Hero"
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import HomeSearchButton from "@/components/HomeSearchButton";

export const metadata = {
  title: "SimClaire | Best Travel eSIMs for 150+ Countries",
  description: "Stay connected worldwide with SimClaire. Buy prepaid travel eSIMs online, avoid roaming fees, and get instant 5G/4G data in over 150 destinations.",
  alternates: {
    canonical: "https://simclaire.com",
  }
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "url": "https://simclaire.com",
        "name": "SimClaire",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://simclaire.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "name": "SiM Claire",
        "url": "https://simclaire.com",
        "logo": "https://simclaire.com/logo.png", // Replace with your actual logo URL
        "sameAs": [ // Add your social links if you have them
          "https://www.instagram.com/simclaireesim",
          "https://www.facebook.com/people/SiM-Claire/61583224601683/",
          "https://www.tiktok.com/@esimclaire?_r=1&_t=ZS-93xcBf9TQE1"
        ]
      }
    ]
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero/>
      <Destinations/>
      <CompatibilityBanner/>
      <HowItWorks/>
      <Testimonials/>
      <TrustedBy/>
      <HomeSearchButton/>
    </div>
  );
}
