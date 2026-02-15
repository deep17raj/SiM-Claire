/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      }
      ,
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname:'**'
      }
    ],
  },
};

export default nextConfig;
