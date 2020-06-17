const Dotenv = require('dotenv-webpack')
const withImages = require('next-images')
const TerserPlugin = require('terser-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = withImages({
  env: {
    API_HOST: 'http://localhost:4000',
    MONGO_SRV: 'mongodb://localhost:27017/zedge',
    MONGO_USER: 'mobile',
    MONGO_PASS: 'Gautampatel@0261',
    MONGO_ADMIN: 'admin',
    JWT_SECRET: 'Paladiya',
    NAME_SPACE: 'Mobile69.in',
    // PUBLIC_URL: 'http://mobile69.in',
    PUBLIC_URL: 'https://mobile69.in/api',
    DOMAIN: 'https://mobile69.in'
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    config.plugins.push(new Dotenv({ silent: true }))
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
    // config.plugins.push(
    //   new UglifyJSPlugin({
    //     uglifyOptions: {
    //       compress: {
    //         drop_console: true
    //       }
    //     }
    //   })
    // )
    // config.optimization = {
    //   minimizer: [
    //     new UglifyJSPlugin({
    //       uglifyOptions: {
    //         compress: {
    //           drop_console: true
    //         }
    //       }
    //     })
    //   ]
    // }
    // config.module.rules.push({
    //   test: /\.(png|svg|jpg|gif)$/,
    //   use: ['file-loader']
    // })
    return config
  }
})
