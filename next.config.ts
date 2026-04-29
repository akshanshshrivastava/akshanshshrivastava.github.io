import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.myshopify.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin/:path*",
        destination: "https://admin.shopify.com/store/kravvy/:path*",
        permanent: false,
      },
      {
        source: "/account/:path*",
        destination: "https://kravvy.myshopify.com/account/:path*",
        permanent: false,
      },
      {
        source: "/orders/:path*",
        destination: "https://kravvy.myshopify.com/orders/:path*",
        permanent: false,
      },
      {
        source: "/tools/:path*",
        destination: "https://kravvy.myshopify.com/tools/:path*",
        permanent: false,
      },
      {
        source: "/customer_identity/:path*",
        destination: "https://kravvy.myshopify.com/customer_identity/:path*",
        permanent: false,
      },
      {
        source: "/services/:path*",
        destination: "https://kravvy.myshopify.com/services/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
