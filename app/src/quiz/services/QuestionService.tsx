import axios from 'axios';
import { Service } from 'typedi';

import { IQuestion } from '../interfaces/IQuestion';

@Service()
class QuestionService {
  public getCurrentQuestion(callback: (row: IQuestion | null) => void): void {
    const currentQuestion = localStorage.getItem('quiz_currentQuestion');
    if (currentQuestion) {
      callback(JSON.parse(currentQuestion));
    } else {
      callback(null);
    }
  }

  public setCurrentQuestion(data: IQuestion): void {
    localStorage.setItem('quiz_currentQuestion', JSON.stringify(data));
  }

  public getTotalQuestionCount(callback: (row: any) => void): void {
    axios.get<number>('http://localhost:8081/api/total-question-count', {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 1000
    }).then(response => {
      callback(response.data);
    });
  }

  public getRandomQuestion(callback: (row: IQuestion) => void): void {
    const answeredQuestionIds = this.getAnsweredQuestionIds();
    axios.get<IQuestion>('http://localhost:8081/api/question/random', {
      params: {
        excludedQuestionIds: answeredQuestionIds
      },
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 1000
    }).then(response => {
      this.setCurrentQuestion(response.data);
      callback(response.data);
    });
  }

  public saveAnsweredQuestion(questionId: number): void {
    const answeredQuestionIds = this.getAnsweredQuestionIds();
    if (!answeredQuestionIds) {
      localStorage.setItem('quiz_answeredQuestionIds', JSON.stringify([questionId]));
    } else {
      answeredQuestionIds.push(questionId);
      localStorage.setItem('quiz_answeredQuestionIds', JSON.stringify(answeredQuestionIds));
    }
  }

  public getAnsweredQuestionIds(): any {
    const answeredQuestionIds = localStorage.getItem('quiz_answeredQuestionIds');
    if (!answeredQuestionIds) {
      return '';
    }

    return JSON.parse(answeredQuestionIds);
  }

  public getAnsweredQuestionsCount(): number {
    const answeredQuestionIds = localStorage.getItem('quiz_answeredQuestionIds');
    if (!answeredQuestionIds) {
      return 0;
    }

    const _answeredQuestionIds = JSON.parse(answeredQuestionIds);

    return _answeredQuestionIds.length;
  }
}

export { QuestionService };