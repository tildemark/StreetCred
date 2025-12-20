/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // For Google Auth profile pics
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // If you use Cloudinary later
      }
    ],
  },
};

export default nextConfig;