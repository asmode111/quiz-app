import express = require("express");

import { QuestionRepository } from "./repositories/QuestionRepository";

const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 8080;
const questionRepository = new QuestionRepository();

const db = new sqlite3.Database("/db/quiz.db", sqlite3.OPEN_READWRITE, (err: any) => {
  if (err) {
    throw err;
  }
  console.log("Connected to the database.");
});

app.get("/api/question", (request: express.Request, response: express.Response) => {
  questionRepository.getFirstQuestion(db, function(row) {
    response.status(200).send(row).end();
  });
});

app.get("/api/question/:id", (request: express.Request, response: express.Response) => {
  const questionId: number = +request.params.id;
  questionRepository.getNextQuestion(db, questionId, function(row) {
    response.status(200).send(row).end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
