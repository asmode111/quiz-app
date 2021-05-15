"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression = require("compression");
// import * as bodyParser from "body-parser";
// import * as cors from "cors";
exports.default = ({ app }) => __awaiter(void 0, void 0, void 0, function* () {
    app.use(compression());
    app.get("/status", (req, res) => {
        console.log("Healthy!");
        res.status(200).end();
    });
    // app.head("/status", (req, res) => {
    //   console.log("Healthy!");
    //   res.status(200).end();
    // });
    app.enable("trust proxy");
    // app.use(cors());
    // app.use(require("morgan")("dev"));
    // app.use(bodyParser.urlencoded({ extended: false }));
    // ...More middlewares
    // Return the express app
    return app;
});
//# sourceMappingURL=express.js.map