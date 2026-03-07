// app/esim/[id]/page.jsx
import { allDestinations } from "@/data/destinationData";
import DestinationClientComponent from "./DestinationClientComponent"; 

const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

// 🌟 1. Dynamic Meta Tags (Already Done & Perfect)
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const urlSlug = resolvedParams.id; 
  
  const matchedCountry = allDestinations.find(dest => 
      generateSlug(dest.destinationName) === urlSlug?.toLowerCase() || 
      dest.destinationName.toLowerCase() === decodeURIComponent(urlSlug || '').toLowerCase()
  );

  if (!matchedCountry) {
    return {
      title: 'Destination Not Found | SimClaire',
      description: 'The requested eSIM destination could not be found.',
    };
  }

  return {
    title: `Best eSIM for ${matchedCountry.destinationName} | Prepaid Travel Data | SimClaire`,
    description: `Traveling to ${matchedCountry.destinationName}? Get instant internet with our prepaid eSIM. No roaming fees, fast 5G/4G coverage, and easy online activation.`,
    alternates: {
      canonical: `https://simclaire.com/esim/${urlSlug}`,
    },
    openGraph: {
      title: `${matchedCountry.destinationName} Travel eSIM - Instant Setup`,
      description: `Buy a prepaid data plan for ${matchedCountry.destinationName} online. Skip the SIM card lines at the airport!`,
      url: `https://simclaire.com/esim/${urlSlug}`,
      images: [
        {
          url: `https://flagcdn.com/w1280/${matchedCountry.isoCode.toLowerCase()}.png`,
          width: 1200,
          height: 630,
          alt: `${matchedCountry.destinationName} Flag`,
        },
      ],
      type: 'website',
    },
  };
}


// 🌟 2. Server Component with JSON-LD Schema injected
export default async function Page({ params }) {
  const resolvedParams = await params;
  const urlSlug = resolvedParams.id; 
  
  const matchedCountry = allDestinations.find(dest => 
      generateSlug(dest.destinationName) === urlSlug?.toLowerCase() || 
      dest.destinationName.toLowerCase() === decodeURIComponent(urlSlug || '').toLowerCase()
  );

  // If no country is found, just render the client component (it handles the error state)
  if (!matchedCountry) {
      return <DestinationClientComponent matchedCountry={null} urlSlug={urlSlug} />;
  }

  // 🌟 BUILD THE SCHEMA MARKUP FOR GOOGLE
 // 🌟 BUILD THE SCHEMA MARKUP FOR GOOGLE
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${matchedCountry.destinationName} Travel eSIM`,
    image: `https://flagcdn.com/w1280/${matchedCountry.isoCode.toLowerCase()}.png`,
    description: `Prepaid travel eSIM data plan for ${matchedCountry.destinationName}. Instant delivery and activation.`,
    brand: {
      '@type': 'Brand',
      name: 'SimClaire',
    },
    offers: {
      '@type': 'AggregateOffer', 
      url: `https://simclaire.com/esim/${urlSlug}`,
      priceCurrency: 'USD',
      lowPrice: '3.99', 
      offerCount: '4', // Keeps Google happy and removes the warning!
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      {/* 🌟 INJECT THE SCHEMA INVISIBLE TO USERS, VISIBLE TO GOOGLE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* RENDER THE UI */}
      <DestinationClientComponent 
         matchedCountry={matchedCountry} 
         urlSlug={urlSlug} 
      />
    </>
  );
}