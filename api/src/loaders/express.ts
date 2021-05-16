import express = require("express");
import cors from "cors";
const compression = require("compression");

import apiRoutes from "../api";
import config from "../config";
// import * as bodyParser from "body-parser";

export default async ({ app }: { app: express.Application }) => {
  app.use(compression());
  app.get("/status", (req, res) => { 
    console.log("Healthy!");
    res.status(200).end(); 
  });
  app.head("/status", (req, res) => {
    console.log("Healthy!");
    res.status(200).end();
  });
  app.enable("trust proxy");

  // Load API routes
  app.use(config.api.prefix, apiRoutes());

  app.use(cors());
  // app.use(require("morgan")("dev"));
  // app.use(bodyParser.urlencoded({ extended: false }));

  return app;
};