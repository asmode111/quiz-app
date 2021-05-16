import { Service, Inject, Container } from "typedi";
import { DbConnection } from "../../loaders/db";

@Service()
class QuestionRepository {
  connection;
  constructor(private readonly dbConnection: DbConnection) {
    this.connection = this.dbConnection.getConnection();
  }

  public getFirstQuestion(callback: (row: any) => void): any  {
    const sql = "SELECT id, question, question_body, question_raw, answers, correct_answer FROM zend_test_question ORDER BY id ASC LIMIT 1";
    this.connection.get(sql, (err: any, row: any) => {
      if (err) {
        throw err;
      }
      
      callback(row);
    });
  }

  public getNextQuestion (questionId: number, callback: (row: any) => void): any {
    const sql = `SELECT id, question, question_body, question_raw, answers, correct_answer 
                FROM zend_test_question 
                WHERE id > ?
                ORDER BY id ASC
                LIMIT 1`;
  
    this.connection.get(sql, [questionId], (err: any, row: any) => {
      if (err) {
        throw err;
      }
    
      callback(row);
    });
  }
}

export { QuestionRepository };

// const getFirstQuestion = function (db) {
//   const sql = `SELECT id, question, question_body, question_raw, answers, correct_answer 
//               FROM zend_test_question 
//               ORDER BY id ASC
//               LIMIT 1`;

//   db.get(sql, (err, row) => {
//     if (err) {
//       throw err;
//     }

//     return row;
//   });
// };

// const getNextQuestion = function (db, questionId) {
//   const sql = `SELECT id, question, question_body, question_raw, answers, correct_answer 
//               FROM zend_test_question 
//               WHERE id > ?
//               ORDER BY id ASC
//               LIMIT 1`;

//   db.get(sql, [questionId], (err, row) => {
//     if (err) {
//       throw err;
//     }

//     return row;
//   });
// };

// module.exports = {
//   getFirstQuestion,
//   getNextQuestion
// };
