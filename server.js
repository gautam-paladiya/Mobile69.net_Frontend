const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const next = require('next')

const port = process.env.PORT || 3000
const env = process.env.NODE_ENV
const dev = env !== 'production'

var cookieParser = require('cookie-parser')

const app = next({ dev })

const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  // server.use(cookieParser())

  // server.use(
  //   createProxyMiddleware('/api', {
  //     target: `http://localhost:4000`,
  //     pathRewrite: { '^/api': '/' },
  //     changeOrigin: true
  //   })
  // )

  server.all('*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) {
      throw err
    }
    console.log('> Ready on ', port)
  })
})
