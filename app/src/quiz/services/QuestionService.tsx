import axios from "axios";
import { Service } from "typedi";

@Service()
class QuestionService {

  private maxQuestionCount = 75;
  private defaultQuestionType = 1; // 1: selected 2: textarea

  public getCurrentQuestion(callback: (currentQuestion: IQuestion | null) => void): void {
    const currentQuestion = localStorage.getItem("quiz_currentQuestion");
    if (currentQuestion) {
      callback(JSON.parse(currentQuestion));
    } else {
      callback(null);
    }
  }

  public setCurrentQuestion(data: IQuestion): void {
    localStorage.setItem("quiz_currentQuestion", JSON.stringify(data));
  }

  public getMaxQuestionCount(isRandomQuiz: boolean, callback: (row: number) => void): void {
    if (isRandomQuiz) {
      callback(this.maxQuestionCount);
    } else {
      axios.get("http://localhost:8081/api/total-question-count", {
        params: {
          questionType: this.defaultQuestionType
        },
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 1000
      }).then(response => {
        callback(response.data);
      });
    }
  }
  
  public getRandomQuestion(callback: (row: IQuestion) => void): void {
    const answeredQuestionIds = this.getAnsweredQuestionIds();
    axios.get<IQuestion>("http://localhost:8081/api/question/random", {
      params: {
        excludedQuestionIds: answeredQuestionIds,
        questionType: this.defaultQuestionType
      },
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 1000
    }).then(response => {
      this.setCurrentQuestion(response.data);
      callback(response.data);
    });
  }

  public getFirstQuestion(callback: (row: IQuestion) => void): void {
    axios.get<IQuestion>("http://localhost:8081/api/question", {
      params: {
        questionType: this.defaultQuestionType
      },
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 1000
    }).then(response => {
      this.setCurrentQuestion(response.data);
      callback(response.data);
    });
  }

  public getNextQuestion(currentQuestionId: number, callback: (row: IQuestion) => void): void {
    axios.get<IQuestion>("http://localhost:8081/api/question/" + currentQuestionId, {
      params: {
        questionType: this.defaultQuestionType
      },
      headers: {
        "Content-Type": "application/json"
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
      localStorage.setItem("quiz_answeredQuestionIds", JSON.stringify([questionId]));
    } else {
      answeredQuestionIds.push(questionId);
      localStorage.setItem("quiz_answeredQuestionIds", JSON.stringify(answeredQuestionIds));
    }
  }

  public getAnsweredQuestionIds(): any {
    const answeredQuestionIds = localStorage.getItem("quiz_answeredQuestionIds");
    if (!answeredQuestionIds) {
      return "";
    }

    return JSON.parse(answeredQuestionIds);
  }

  public getAnsweredQuestionsCount(): number {
    const answeredQuestionIds = localStorage.getItem("quiz_answeredQuestionIds");
    if (!answeredQuestionIds) {
      return 0;
    }

    const _answeredQuestionIds = JSON.parse(answeredQuestionIds);

    return _answeredQuestionIds.length;
  }

  public isQuizFinished(maxQuestionCount: number): boolean {
    return this.getAnsweredQuestionsCount() >= maxQuestionCount;
  }

  public resetData(): void {
    localStorage.removeItem("quiz_answeredQuestionIds");
    localStorage.removeItem("quiz_currentQuestion");
  }
}

export { QuestionService };