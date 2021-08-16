import { Service } from 'typedi';

@Service()
class AnswerService {
  public isAnswerCorrect(selectedAnswers: any, correctAnswers: any): boolean {
    const intersection = selectedAnswers.filter((x: string) => !correctAnswers.includes(x));

    return selectedAnswers.length !== correctAnswers.length || intersection.length != 0;
  }

  public getCorrectAnswersCount(): number {
    const correctAnswersCount = localStorage.getItem('quiz_correctAnswersCount');
    if (!correctAnswersCount) {
      return 0;
    }

    return parseInt(correctAnswersCount);
  }

  public incrementCorrectAnswersCount(): number {
    const currentCorrectAnswersCount = this.getCorrectAnswersCount();
    const correctAnswersCount = currentCorrectAnswersCount + 1;
    localStorage.setItem('quiz_correctAnswersCount', correctAnswersCount.toString());

    return correctAnswersCount;
  }
}

export { AnswerService };