import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local SVG placeholders live in /public/images. Real photography can be
    // served from Supabase Storage — add your project host here when ready.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
