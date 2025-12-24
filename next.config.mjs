/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001', 'reimagined-palm-tree-5g4x9r7wwpc47j-3001.app.github.dev']
    }
  },
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