/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    basePath: isProd ? '/Rick-Morty' : '',
    assetPrefix: isProd ? '/Rick-Morty/' : '',
    reactStrictMode: true,
};

module.exports = nextConfig;
