import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    transpilePackages: ['@mui/material', '@mui/system', '@mui/icons-material'],
    output : "standalone",
};

export default nextConfig;
