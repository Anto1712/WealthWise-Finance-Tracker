/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@wealthwise/shared-types"],
  output: "standalone",
};

module.exports = nextConfig;
