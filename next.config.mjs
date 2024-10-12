/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://www.osmanoguzsensoy.com/:path*', // Proxy API isteklerini yönlendir
            },
        ];
    },
};

export default nextConfig;
