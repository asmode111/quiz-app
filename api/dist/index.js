const express = require("express");
const questionRepository = require("./repositories/Question");
const app = express();
const port = 8080;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("/db/quiz.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connected to the database.");
});
app.get("/api/question", (req, res) => {
    console.log("11111");
    const row = questionRepository.getFirstQuestion(db);
    console.log(row);
    res.status(200).send(row).end();
    console.log("3333");
});
app.get("/api/question/:id", (req, res) => {
    const row = questionRepository.getNextQuestion(db, req.params.id);
    res.status(200).send(row).end();
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map