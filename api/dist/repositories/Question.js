const getFirstQuestion = function (db) {
    const sql = `SELECT id, question, question_body, question_raw, answers, correct_answer 
              FROM zend_test_question 
              ORDER BY id ASC
              LIMIT 1`;
    db.get(sql, (err, row) => {
        if (err) {
            throw err;
        }
        return row;
    });
};
const getNextQuestion = function (db, questionId) {
    const sql = `SELECT id, question, question_body, question_raw, answers, correct_answer 
              FROM zend_test_question 
              WHERE id > ?
              ORDER BY id ASC
              LIMIT 1`;
    db.get(sql, [questionId], (err, row) => {
        if (err) {
            throw err;
        }
        return row;
    });
};
module.exports = {
    getFirstQuestion,
    getNextQuestion
};
//# sourceMappingURL=Question.js.map