/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL('https://media.worldofinteriors.com/**')],
      },
};

module.exports = nextConfig;
