/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "yeyak.seoul.go.kr",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
