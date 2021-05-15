import expressLoader from "./express";
import dbLoader from "./db";

export default async ({ expressApp }) => {
  const dbConnection = await dbLoader();
  console.log("DB Initialized");
  await expressLoader({ app: expressApp });
  console.log("Express Initialized");

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
};

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
