/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "osmanoguzsensoy.com", // Görsellerin yüklendiği domain
        port: "", // Eğer özel bir port kullanıyorsanız ekleyin, aksi takdirde boş bırakın
        pathname: "/**", // Alt dizinleri belirtmek için joker karakter
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
