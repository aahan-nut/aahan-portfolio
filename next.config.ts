import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Khronos now lives on the separate robotics site; its old page points at the homepage summary.
    return [{ source: "/projects/khronos", destination: "/#robotics", permanent: false }];
  },
};

export default nextConfig;
