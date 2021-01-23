const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const next = require("next");

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV;
console.log("env", env);
const dev = env !== "production";

var cookieParser = require("cookie-parser");

const app = next({ dev });

const handle = app.getRequestHandler();
// const handler = routes.getRequestHandler( app )

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());
  // server.use(
  //   createProxyMiddleware(`/api`, {
  //     target: `http://localhost:4000`,
  //     pathRewrite: { "^/api": "" },
  //   })
  // );
  // server.get("/detail/:id", (req, res) => {
  //   return app.render(req, res, "/detail", { id: req.params.id });
  // });

  server.get("*", (req, res) => {
    return handle(req, res);
  });
  // Does this fix it? Also fallback for POST.. ?
  server.post("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log("> Ready on ", port);
  });
});
