/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.freepik.com',
          },
          {
            protocol: 'https',
            hostname: 'i.ibb.co.com'
          },
          {
            protocol: 'https',
            hostname: 'pub-c84ae17680f74c7c880037b93a3a734d.r2.dev'
          }
        ],
      },
      
};

export default nextConfig;
