import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
},
typescript: {
  // !! WARN !!
  // Dangerously allow production builds to successfully complete even if
  // your project has type errors.
  // !! WARN !!
  ignoreBuildErrors: true,
},
experimental:{
  serverActions: {
    bodySizeLimit: '10mb',
  },
},
// images: {
//   domains: ["uploads.pakwachfm.com"], // Ensure the domain is allowed
// },
};

export default nextConfig;