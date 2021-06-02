import { QuestionRepository } from "../repositories/QuestionRepository";
import { Service } from "typedi";

@Service()
class QuestionService {

  constructor(private readonly questionRepository: QuestionRepository) { }

  public getFirstQuestion(callback: (row: any) => void): any  {
    let self = this;
    this.questionRepository.getFirstQuestion(function(result) {
      
      result.correct_answer = self.prepareCorrectAnswer(result.correct_answer);

      callback(result);
    });
  }

  public getNextQuestion (questionId: number, callback: (row: any) => void): any {
    let self = this;
    this.questionRepository.getNextQuestion(questionId, function(result) {
      
      result.correct_answer = self.prepareCorrectAnswer(result.correct_answer);

      callback(result);
    });
  }

  private prepareCorrectAnswer(correctAnswers): any {
    return correctAnswers.trim().split('');
  }
}
  
export { QuestionService };