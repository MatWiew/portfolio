import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Folder /templates jest czytany w runtime przez API routes (fs.readFileSync)
  // — bez tego wpisu Vercel mógłby nie spakować jego zawartości do funkcji
  // serverless podczas trace'owania zależności przy buildzie.
  outputFileTracingIncludes: {
    "/api/templates": ["./templates/**/*"],
    "/api/templates/[slug]/preview": ["./templates/**/*"],
  },
};

export default nextConfig;
