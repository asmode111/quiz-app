interface IQuestion {
  id: number;
  question: string;
  question_body: string;
  answers: any;
  correct_answers: any;
}

//////////////////////////////////////

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
  onSelectedAnswersChange: (val: { [key: string]: string[] }) => void;
}

interface IInfoProps {
  totalQuestionCount: number;
  answeredQuestionCount: number;
  correctAnswersCount: number;
}

interface IQuestionProps {
  children: React.ReactNode;
  question: string;
  questionBody: string;
}

interface ITimer {
  hours: number;
  minutes: number;
  seconds: number;
}