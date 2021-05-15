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
const express_1 = __importDefault(require("./express"));
const db_1 = __importDefault(require("./db"));
exports.default = ({ expressApp }) => __awaiter(void 0, void 0, void 0, function* () {
    const dbConnection = yield db_1.default();
    console.log("DB Initialized");
    yield express_1.default({ app: expressApp });
    console.log("Express Initialized");
    // ... more loaders can be here
    // ... Initialize agenda
    // ... or Redis, or whatever you want
});
// import express = require("express");
// require("dotenv").config();
// const compression = require("compression");
// import { QuestionService } from "../services/QuestionService";
// const sqlite3 = require("sqlite3").verbose();
// const app = express();
// app.use(compression());
// const PORT = process.env.PORT || 8080;
// const questionService = new QuestionService();
// const db = new sqlite3.Database("/db/quiz.db", sqlite3.OPEN_READWRITE, (err: any) => {
//   if (err) {
//     throw err;
//   }
//   console.log("Connected to the database.");
// });
// app.get("/api/question", (request: express.Request, response: express.Response) => {
//   questionService.getFirstQuestion(db, function(row) {
//     response.status(200).send(row).end();
//   });
// });
// app.get("/api/question/:id", (request: express.Request, response: express.Response) => {
//   const questionId: number = +request.params.id;
//   questionService.getNextQuestion(db, questionId, function(row) {
//     response.status(200).send(row).end();
//   });
// });
// app.listen(PORT, () => {
//   console.log(`Example app listening at http://localhost:${PORT}`);
// });
//# sourceMappingURL=index.js.map