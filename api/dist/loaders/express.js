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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const compression = require("compression");
const api_1 = __importDefault(require("../api"));
const config_1 = __importDefault(require("../config"));
// import * as bodyParser from "body-parser";
exports.default = ({ app }) => __awaiter(void 0, void 0, void 0, function* () {
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
    app.use(config_1.default.api.prefix, api_1.default());
    app.use(cors_1.default());
    // app.use(require("morgan")("dev"));
    // app.use(bodyParser.urlencoded({ extended: false }));
    return app;
});
//# sourceMappingURL=express.js.map