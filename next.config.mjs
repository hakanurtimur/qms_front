/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://www.osmanoguzsensoy.com/api/:path*', // Proxy API isteklerini yönlendir
            },
            {
                source: '/public/:path*',
                destination: 'https://www.osmanoguzsensoy.com/public/:path*', // Proxy Public isteklerini yönlendir
            },
        ];
    },
};

export default nextConfig;
