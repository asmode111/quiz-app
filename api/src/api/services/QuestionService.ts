import { QuestionRepository } from "../repositories/QuestionRepository";
import { Service } from "typedi";

@Service()
class QuestionService {

  constructor(private readonly questionRepository: QuestionRepository) { }

  public getFirstQuestion(callback: (row: any) => void): any  {
    const that = this;
    this.questionRepository.getFirstQuestion(function(result) {
      
      result.correct_answer = that.prepareCorrectAnswer(result.correct_answer);

      callback(result);
    });
  }

  public getNextQuestion (questionId: number, callback: (row: any) => void): any {
    const that = this;
    this.questionRepository.getNextQuestion(questionId, function(result) {
      
      result.correct_answer = that.prepareCorrectAnswer(result.correct_answer);

      callback(result);
    });
  }

  private prepareCorrectAnswer(correctAnswers: string): any {
    return correctAnswers.trim().split("");
  }
}
  
export { QuestionService };