/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    basePath: isProd ? '/Rick-Morty' : '',
    assetPrefix: isProd ? '/Rick-Morty/' : '',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'rickandmortyapi.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    reactStrictMode: true,
};

module.exports = nextConfig;
