/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  sassOptions:{
    includePaths:[path.join(__dirname,"styles")],
    prependData:`@import "./base.scss";`
  },
  images:{
    remotePatterns:[{
      protocol:'https',
      hostname:'**',
    }],
     
  }
}

module.exports = nextConfig
