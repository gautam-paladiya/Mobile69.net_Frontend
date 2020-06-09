module.exports = {
  env: {
    API_HOST: 'http://localhost:4000',
    MONGO_SRV: 'mongodb://localhost:27017/zedge',
    MONGO_USER: 'mobile',
    MONGO_PASS: 'Gautampatel@0261',
    MONGO_ADMIN: 'admin',
    JWT_SECRET: 'Paladiya',
    NAME_SPACE: 'Mobile69.in',
    // PUBLIC_URL: 'http://localhost:3000'
    PUBLIC_URL: 'http://3.16.29.117',
    DOMAIN:'https://zedge-next.now.sh'
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
    config.module.rules.push({
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader']
    })
    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config
  }
}
