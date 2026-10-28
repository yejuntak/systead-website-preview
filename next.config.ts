import type { NextConfig } from 'next';
const config: NextConfig = { output: 'export', basePath: process.env.SITE_BASE_PATH || '', trailingSlash: true, images: { unoptimized: true }, poweredByHeader: false };
export default config;
