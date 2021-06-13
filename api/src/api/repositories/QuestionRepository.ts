import { Service, Inject, Container } from "typedi";
import { DbConnection } from "../../loaders/db";

@Service()
class QuestionRepository {
  private connection : any;
  constructor(private readonly dbConnection: DbConnection) {
    this.connection = this.dbConnection.getConnection();
  }

  public getFirstQuestion(callback: (row: any) => void): any  {
    const sql = "SELECT id, question, question_body, question_raw, answers, correct_answer FROM questions ORDER BY id ASC LIMIT 1";
    this.connection.get(sql, (err: any, row: any) => {
      if (err) {
        throw err;
      }
      
      callback(row);
    });
  }

  public getNextQuestion (questionId: number, callback: (row: any) => void): any {
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
}

export { QuestionRepository };