import { QuestionRepository } from "../repositories/QuestionRepository";
import { Service } from "typedi";

@Service()
class QuestionService {

  constructor(private readonly questionRepository: QuestionRepository) { }

  public getFirstQuestion(callback: (row: any) => void): void {
    this.questionRepository.getFirstQuestion((result) => {
      callback(this.prepareResult(result));
    });
  }

  public getNextQuestion(questionId: number, callback: (row: any) => void): void {
    this.questionRepository.getNextQuestion(questionId, (result) => {
      callback(this.prepareResult(result));
    });
  }

  public getTotalQuestionCount(callback: (row: any) => void): void {
    this.questionRepository.getTotalQuestionCount((result) => {
      callback(result);
    });
  }

  private prepareResult(result: any): any {
    result.correct_answers = this.prepareCorrectAnswer(result.correct_answer);
    result.answers = this.prepareAnswers(result.answers);
    result = this.unsetUnnecessaryFields(result);

    return result;
  }

  private prepareCorrectAnswer(correctAnswers: string): any {
    return correctAnswers.trim().split("");
  }

  private prepareAnswers(answers: string): any {
    return JSON.parse(answers);
  }

  private unsetUnnecessaryFields(result: any): any {
    delete result["question_raw"];
    delete result["correct_answer"];

    return result;
  }
}

export { QuestionService };