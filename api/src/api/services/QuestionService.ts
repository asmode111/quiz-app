import { QuestionRepository } from "../repositories/QuestionRepository";
import { Service } from "typedi";

@Service()
class QuestionService {

  constructor(private readonly questionRepository: QuestionRepository) { }

  public getFirstQuestion(callback: (row: any) => void): any  {
    this.questionRepository.getFirstQuestion((result) => {
      
      result.correct_answer = this.prepareCorrectAnswer(result.correct_answer);

      callback(result);
    });
  }

  public getNextQuestion (questionId: number, callback: (row: any) => void): any {
    this.questionRepository.getNextQuestion(questionId, (result) => {
      
      result.correct_answer = this.prepareCorrectAnswer(result.correct_answer);

      callback(result);
    });
  }

  private prepareCorrectAnswer(correctAnswers: string): any {
    return correctAnswers.trim().split("");
  }
}
  
export { QuestionService };