import { QuestionRepository } from "../repositories/QuestionRepository";
import { Service } from "typedi";

@Service()
class QuestionService {

  constructor(private readonly questionRepository: QuestionRepository) { }

  private questionTypeSelectable = 1;
  private questionTypeEssay = 2;

  public getFirstQuestion(questionType: number, callback: (row: any) => void): void {
    this.questionRepository.getFirstQuestion(questionType, (result) => {
      callback(this.prepareResult(result));
    });
  }

  public getQuestion(questionId: number, callback: (row: any) => void): void {
    this.questionRepository.getQuestion(questionId, (result) => {
      callback(this.prepareResult(result));
    });
  }

  public getNextQuestion(questionId: number, questionType: number, callback: (row: any) => void): void {
    this.questionRepository.getNextQuestion(questionId, questionType, (result) => {
      callback(this.prepareResult(result));
    });
  }

  public getRandomQuestion(excludedQuestionIds: string, questionType: number, callback: (row: any) => void): void {
    this.questionRepository.getRandomQuestion(excludedQuestionIds, questionType, (result) => {
      callback(this.prepareResult(result));
    });
  }

  public getTotalQuestionCount(questionType: number, callback: (row: any) => void): void {
    this.questionRepository.getTotalQuestionCount(questionType, (result) => {
      callback(result);
    });
  }

  private prepareResult(result: any): any {
    result.correct_answers = this.prepareCorrectAnswer(result.correct_answer, result.question_type);
    result.answers = this.prepareAnswers(result.answers);
    result = this.unsetUnnecessaryFields(result);

    return result;
  }

  private prepareCorrectAnswer(correctAnswers: string, questionType: number): any {
    if (questionType !== this.questionTypeSelectable) {
      return correctAnswers.trim();
    }

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