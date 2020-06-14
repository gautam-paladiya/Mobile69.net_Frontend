const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const next = require('next')

const port = process.env.PORT || 3000
const env = process.env.NODE_ENV
console.log('env', env)
const dev = env !== 'production'

var cookieParser = require('cookie-parser')

const app = next({ dev })

const handle = app.getRequestHandler()
const server = express()

app.prepare().then(() => {
  server.use(cookieParser())

  // server.use(
  //   createProxyMiddleware(`/api`, {
  //     target: `http://localhost:4000`,
  //     pathRewrite: { '^/api': '' }
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
