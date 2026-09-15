import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/register",
        destination: "https://makemypass.com/event/odyssey",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
