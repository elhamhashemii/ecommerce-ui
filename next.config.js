/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL('https://media.worldofinteriors.com/**')],
    domains: ['storage.c2.liara.space'],

  },
};

module.exports = nextConfig;
