export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/signup'],
    },
    // Optional: Add your sitemap URL here if you have one
    sitemap: 'https://www.simclaire.com/sitemap.xml',
  }
}