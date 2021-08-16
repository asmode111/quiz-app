import { Service, Inject, Container } from "typedi";
import { DbConnection } from "../../loaders/db";

@Service()
class QuestionRepository {
  private connection: any;
  constructor(private readonly dbConnection: DbConnection) {
    this.connection = this.dbConnection.getConnection();
  }

  public getFirstQuestion(callback: (row: any) => void): void {
    const sql = "SELECT id, question, question_body, question_raw, answers, correct_answer FROM questions ORDER BY id ASC LIMIT 1";
    this.connection.get(sql, (err: any, row: any) => {
      if (err) {
        throw err;
      }

      callback(row);
    });
  }

  public getNextQuestion(questionId: number, callback: (row: any) => void): void {
    const sql = `SELECT id, question, question_body, question_raw, answers, correct_answer 
                FROM questions 
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

  public getRandomQuestion(excludedQuestionIds: string, callback: (row: any) => void): void {
    let sql = `SELECT id, question, question_body, question_raw, answers, correct_answer 
                FROM questions 
                WHERE id NOT IN (` + excludedQuestionIds + `) 
                ORDER BY RANDOM() 
                LIMIT 1 `;

    this.connection.get(sql, [], (err: any, row: any) => {
      if (err) {
        throw err;
      }

      callback(row);
    });
  }

  public getTotalQuestionCount(callback: (row: any) => void): void {
    const sql = "SELECT COUNT(id) AS totalQuestionCount FROM questions";
    this.connection.get(sql, (err: any, row: any) => {
      if (err) {
        throw err;
      }

      callback(row["totalQuestionCount"]);
    });
  }
}

export { QuestionRepository };