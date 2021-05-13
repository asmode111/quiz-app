"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const QuestionRepository_1 = require("./repositories/QuestionRepository");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 8080;
const questionRepository = new QuestionRepository_1.QuestionRepository();
const db = new sqlite3.Database("/db/quiz.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to the database.");
});
app.get("/api/question", (request, response) => {
    questionRepository.getFirstQuestion(db, function (row) {
        response.status(200).send(row).end();
    });
});
app.get("/api/question/:id", (request, response) => {
    const questionId = +request.params.id;
    questionRepository.getNextQuestion(db, questionId, function (row) {
        response.status(200).send(row).end();
    });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map