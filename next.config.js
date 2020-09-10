const Dotenv = require("dotenv-webpack");
const withImages = require("next-images");
const TerserPlugin = require("terser-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = withImages({
  env: {
    MONGO_SRV: "mongodb://localhost:27017/zedge",
    MONGO_USER: "mobile",
    MONGO_PASS: "Gautampatel@0261",
    MONGO_ADMIN: "admin",
    JWT_SECRET: "Paladiya",
    NAME_SPACE: "Mobile69.in",
    // PUBLIC_URL: "http://mobile69.in",
    // PUBLIC_URL: "http://192.168.100.9:3000/api",
    PUBLIC_URL: "https://mobile69.in/api",
    DOMAIN: "https://mobile69.in",
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new Dotenv({ silent: true }));
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    return config;
  },
});
