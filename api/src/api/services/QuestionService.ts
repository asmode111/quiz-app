import { QuestionRepository } from "../repositories/QuestionRepository";
import { Service } from "typedi";

@Service()
class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) { }
  public getFirstQuestion(callback: (row: any) => void): any  {
    return this.questionRepository.getFirstQuestion(callback);
  }

  public getNextQuestion (questionId: number, callback: (row: any) => void): any {
    return this.questionRepository.getNextQuestion(questionId, callback);
  }
}
  
export { QuestionService };