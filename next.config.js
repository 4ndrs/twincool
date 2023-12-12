/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.daia.love",
        pathname: "/*",
      },
    ],
  },
};

module.exports = nextConfig;
