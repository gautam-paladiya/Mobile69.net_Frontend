const Dotenv = require("dotenv-webpack");
const withImages = require("next-images");
const TerserPlugin = require("terser-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

module.exports = withImages({
  env: {
    MONGO_SRV: "mongodb://localhost:27017/zedge",
    MONGO_USER: "mobile",
    MONGO_PASS: "Gautampatel@0261",
    MONGO_ADMIN: "admin",
    JWT_SECRET: "Paladiya",
    NAME_SPACE: "Mobile69.net",
    // PUBLIC_URL: "http://mobile69.net",
    // PUBLIC_URL: "http://192.168.100.4:3000/api",
    // PUBLIC_URL: "http://18.188.37.90/api",
    PUBLIC_URL: "https://mobile69.net/api",
    DOMAIN: "https://mobile69.net",
    ANDROID_ID: "https://play.google.com/store/apps/details?id=com.mobile69",
    IOS_ID: "https://play.google.com/store/apps/details?id=com.mobile69",
    MONGO_DB:
      "mongodb://mobile:Gautampatel%400261@18.188.37.90:27017/?authSource=admin",
    // MONGO_DB:
    //   "mongodb+srv://gautam:gautam@cluster0.emjg5.mongodb.net/test?retryWrites=true&w=majority",
    // MONGO_DB: "mongodb://localhost:27017",
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new Dotenv({ silent: true }));
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    config.plugins.push(new CaseSensitivePathsPlugin());

    return config;
  },
});
