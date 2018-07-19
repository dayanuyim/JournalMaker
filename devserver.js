let webpack = require("webpack");

let path = require("path");
let express = require("express");
let fs = require("fs");


let webpackDevMiddleware = require("webpack-dev-middleware");
let webpackHotMiddleware = require("webpack-hot-middleware");
let bodyParser = require("body-parser");

const PORT = parseInt(process.env.PORT) || 8080;

let config = require("./webpack.config.js");

let compiler = webpack(config);
let server = express();
let router = express.Router();


router.get("/$", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"))
});

router.get("/main.css*", (req, res) => {
  res.setHeader("Content-Type", "text/css");
  res.sendFile(path.join(__dirname, "src", "css", req.path));
});

server.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    stats: {
      colors: true,
      chunks: false
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  })
);

server.use(webpackHotMiddleware(compiler));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(router);

server.listen(PORT, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.info(`==> Listening on port ${PORT}. Open up http://localhost:${PORT}/ in your browser.`);
  }
});
