const express = require("express");

// const questionRepository = require("./repositories/Question.js");

const app = express();
const port = 8080;

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("/db/quiz.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the database.");
});

// app.get("/api/question", (req, res) => {
//   let row = questionRepository.getFirstQuestion(db);
//   console.log(row);
//   res.status(200).send(row).end();
// });

app.get("/api/question", (req, res) => {
  let sql = `SELECT id, question, question_body, question_raw, answers, correct_answer
              FROM zend_test_question
              ORDER BY id ASC
              LIMIT 1`;
  db.get(sql, (err, row) => {
    if (err) {
      throw err;
    }

    console.log(row);
    res.status(200).send(row).end();
  });
});

app.get("/api/question/:id", (req, res) => {
  let sql = `SELECT id, question, question_body, question_raw, answers, correct_answer 
              FROM zend_test_question 
              WHERE id > ?
              ORDER BY id ASC
              LIMIT 1`;
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      throw err;
    }

    if (row) {
      res.status(200).send(row).end();
    } else {
      res.status(200).send([]).end();
    }
  });
});

function closeDb(db) {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
