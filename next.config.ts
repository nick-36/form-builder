import { NextConfig } from "next";
const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      { protocol: "https", hostname: "utfs.io" },
      { protocol: "https", hostname: "tailwindui.com" },
    ],
  },
};

if (isDev) {
  nextConfig.rewrites = async () => {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_API_URL_DEV}/:path*`, // Proxy to Backend
      },
    ];
  };
}

export default nextConfig;
