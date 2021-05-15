import { QuestionRepository } from "../repositories/QuestionRepository";

const questionRepository = new QuestionRepository();

class QuestionService {
    public getFirstQuestion(db: any, callback: (row: any) => void): any  {
      return questionRepository.getFirstQuestion(db, callback);
    }
  
    public getNextQuestion (db: any, questionId: number, callback: (row: any) => void): any {
      return questionRepository.getNextQuestion(db, questionId, callback);
    }
  }
  
  export { QuestionService };