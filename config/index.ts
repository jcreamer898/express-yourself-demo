import * as e from "express";
import * as webpack from "webpack";

const config: webpack.Configuration = {
  entry: {
    app: "./app/shared/client"
  },
};

const middleware: e.Handler[] = [(req, res, next) => {
  if (req.originalUrl.indexOf(".json") > -1) {
    req.headers["content-type"] = "application/json";
  }

  next();
}];

export default {
  middleware,
  webpack: config,
}
