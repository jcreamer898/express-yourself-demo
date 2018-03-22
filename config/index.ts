import * as e from "express";
import * as webpack from "webpack";
import * as fs from "fs";
import * as path from "path";
import { IUserConfig } from "@lonelyplanet/travel-agent/dist/classes/userConfigResolver";

const sw = fs.readFileSync(path.join(process.cwd(), "workers", "sw.js"));

const config: webpack.Configuration = {
  entry: {
    app: "./app/shared/client",
  },
};

const middleware: e.Handler[] = [(req, res, next) => {
  if (req.originalUrl.indexOf(".json") > -1) {
    req.headers["content-type"] = "application/json";
  }

  next();
}, (req, res, next) => {
  if (req.originalUrl.includes("sw.js")) {
    res.setHeader("Content-Type", "application/javascript");
    return res.send(sw.toString());
  }

  next();
}];

const appConfig: IUserConfig = {
  middleware,
  webpack: config,
};

export default appConfig;
