module.exports = {
  presets: ['next/babel'],
  plugins: [['transform-define', { 'process.env.NODE_ENV': 'production' }]]
}
