const withImages = require("next-images");
const withPWA = require("next-pwa");

module.exports = withPWA(
  withImages({
    env: {
      MONGO_SRV: "mongodb://localhost:27017/zedge",
      MONGO_USER: "mobile",
      MONGO_PASS: "Gautampatel@0261",
      MONGO_ADMIN: "admin",
      JWT_SECRET: "Paladiya",
      NAME_SPACE: "Mobile69.net",
      // PUBLIC_URL: "http://mobile69.net",
      // PUBLIC_URL: "/api",
      PUBLIC_URL: "https://www.mobile69.net/api",
      DOMAIN: "https://mobile69.net",
      ANDROID_ID: "https://play.google.com/store/apps/details?id=com.mobile69",
      IOS_ID: "https://play.google.com/store/apps/details?id=com.mobile69",
    },
    pwa: {
      // disable: !isProd,
      dest: "public",
    },
    // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    //   config.plugins.push(new Dotenv({ silent: true }));
    //   config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    //   config.plugins.push(new CaseSensitivePathsPlugin());
    //   if (!isServer) {
    //     config.node = {
    //       fs: 'empty',
    //       net: 'empty'
    //     }
    //   }
    //   return config;
    // },
    // images: {
    //   domains: ['mobile69.net'],
    // },
  })
);
