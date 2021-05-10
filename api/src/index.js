const express = require("express");

const app = express();
const port = 8080;

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

app.get("/", (req, res) => {
  res.send("Page workingddd dddxxxddddaaaaaaeeee!");
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
