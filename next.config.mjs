/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
    images: {
    loader: 'custom',
    loaderFile: './image_loader.js',
  },

};

export default nextConfig;
