import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Otimizações
  reactStrictMode: true,
  poweredByHeader: false,
  // Base path para GitHub Pages (remover se usar domínio customizado)
  basePath: '',
  trailingSlash: true,
};

export default nextConfig;
