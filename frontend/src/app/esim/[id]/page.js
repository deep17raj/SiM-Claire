// app/esim/[id]/page.jsx
import { allDestinations } from "@/data/destinationData";
import DestinationClientComponent from "./DestinationClientComponent"; 

const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

// 🌟 1. Async and await params here
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
      canonical: `https://simclaire.com/esim/${urlSlug}`, // Fixed typo here!
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


// 🌟 2. Async and await params here too!
export default async function Page({ params }) {
  const resolvedParams = await params;
  const urlSlug = resolvedParams.id; 
  
  const matchedCountry = allDestinations.find(dest => 
      generateSlug(dest.destinationName) === urlSlug?.toLowerCase() || 
      dest.destinationName.toLowerCase() === decodeURIComponent(urlSlug || '').toLowerCase()
  );

  return (
    <DestinationClientComponent 
       matchedCountry={matchedCountry} 
       urlSlug={urlSlug} 
    />
  );
}