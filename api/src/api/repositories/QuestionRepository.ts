import { Service, Inject, Container } from "typedi";
import { DbConnection } from "../../loaders/db";

@Service()
class QuestionRepository {

  private connection: any;

  constructor(private readonly dbConnection: DbConnection) {
    this.connection = this.dbConnection.getConnection();
  }

  public getFirstQuestion(questionType: number, callback: (row: any) => void): void {
    const sql = `SELECT id, question, question_body, question_raw, answers, correct_answer, question_type
                  FROM questions
                  WHERE question_type = ?
                  ORDER BY id ASC LIMIT 1`;
    this.connection.get(sql, [questionType], (err: any, row: any) => {
      if (err) {
        throw err;
      }

      callback(row);
    });
  }

  public getNextQuestion(questionId: number, questionType: number, callback: (row: any) => void): void {
    const sql = `SELECT id, question, question_body, question_raw, answers, correct_answer, question_type 
                FROM questions 
                WHERE id > ? AND question_type = ?
                ORDER BY id ASC
                LIMIT 1`;

    this.connection.get(sql, [questionId, questionType], (err: any, row: any) => {
      if (err) {
        throw err;
      }

      callback(row);
    });
  }

  public getRandomQuestion(excludedQuestionIds: string, questionType: number, callback: (row: any) => void): void {
    const sql = `SELECT id, question, question_body, question_raw, answers, correct_answer, question_type 
                FROM questions 
                WHERE id NOT IN (` + excludedQuestionIds + `) 
                  AND question_type = ?
                ORDER BY RANDOM() 
                LIMIT 1 `;

    this.connection.get(sql, [questionType], (err: any, row: any) => {
      if (err) {
        throw err;
      }

      callback(row);
    });
  }

  public getTotalQuestionCount(questionType: number, callback: (row: any) => void): void {
    const sql = `SELECT COUNT(id) AS totalQuestionCount 
                  FROM questions 
                  WHERE question_type = ?`;
    this.connection.get(sql, [questionType], (err: any, row: any) => {
      if (err) {
        throw err;
      }

      callback(row["totalQuestionCount"]);
    });
  }
}

export { QuestionRepository };