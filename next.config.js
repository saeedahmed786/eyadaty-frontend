/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["http://res.cloudinary.com/"]
  },
}

// module.exports = {
//   env: {
//     BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL
//   },
// }

module.exports = nextConfig
