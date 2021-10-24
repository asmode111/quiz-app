interface IQuestion {
  id: number;
  question: string;
  question_body: string;
  answers: any;
  correct_answers: any;
}

interface IAnswerResult {
  isAnswered: boolean;
  isCorrect: boolean;
  message: string;
}

interface IAnswersProps {
  questionId: number;
  answers: string;
  correctAnswers: string;
  isAnswered: boolean;
  onIsAnswerSelected: () => void;
}

interface IInfoProps {
  maxQuestionCount: number;
  answeredQuestionCount: number;
  correctAnswersCount: number;
}

interface IQuestionProps {
  questionId: number;
  question: string;
  questionBody: string;
}

interface ITimer {
  hours: number;
  minutes: number;
  seconds: number;
}

interface ISelectableQuizComponentProps {
  onQuizReset: () => void;
  isRandomQuiz: boolean;
}

interface IEssayQuizComponentProps {
  onQuizReset: () => void;
}