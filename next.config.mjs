/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tiwila.github.io"
      },
      {
        protocol: "https",
        hostname: "image.thum.io"
      }
    ]
  }
};

export default nextConfig;

