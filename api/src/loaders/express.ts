import express = require("express");
import cors from "cors";
const compression = require("compression");

import apiRoutes from "../api";
import config from "../config";
// import * as bodyParser from "body-parser";

var allowlist = ['http://localhost:8080/']

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
  app.use(cors({
    'origin': 'http://localhost:8080',
    'methods': 'GET,POST',
  }));
  app.use(config.api.prefix, apiRoutes());
  
  // app.use(require("morgan")("dev"));
  // app.use(bodyParser.urlencoded({ extended: false }));

  return app;
};