// app/sitemap.js
import { allDestinations } from "@/data/destinationData";

// Reusing your trusty slug generator!
const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

export default function sitemap() {
  const baseUrl = "https://simclaire.com";

  // 1. Generate URLs for all 150+ eSIM destinations dynamically
  const destinationUrls = allDestinations.map((dest) => ({
    url: `${baseUrl}/esim/${generateSlug(dest.destinationName)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly', // Tells Google prices/plans might update weekly
    priority: 0.8, // Tells Google these product pages are highly important
  }));

  // 2. Define your static core pages
  const staticUrls = [
    {
      url: `${baseUrl}`, // Your Homepage
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0, // Homepage gets top priority
    },
    {
      url: `${baseUrl}/esim`, // Your "View All Countries" page
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/support`, // Help Center / Zoho page
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // Add any other static pages you have here (like /about, /contact)
  ];

  // 3. Combine them all and hand them to Next.js
  return [...staticUrls, ...destinationUrls];
}