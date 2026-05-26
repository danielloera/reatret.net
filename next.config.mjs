/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './image_loader.js',
    qualities: [50, 75],
  },
};

export default nextConfig;
