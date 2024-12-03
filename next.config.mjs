/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "izmkysapi.mph.com.tr",
        pathname: "/private/profileImagefolder/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.BASE_PROXY_URL, // Proxy API isteklerini yönlendir
      },
      {
        source: "/public/:path*",
        destination: process.env.PUBLIC_PROXY_URL, // Proxy Public isteklerini yönlendir
      },
      {
        source: "/private/:path*",
        destination: process.env.PRIVATE_PROXY_URL, // Proxy Private isteklerini yönlendir
      },
    ];
  },
};

export default nextConfig;
