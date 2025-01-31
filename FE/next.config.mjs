/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fastapi-app1-855220130399.us-central1.run.app",
        pathname: "/static/extracted_images/**", // Adjusted for your image directory
      },
    ],
  },
};

export default nextConfig;
