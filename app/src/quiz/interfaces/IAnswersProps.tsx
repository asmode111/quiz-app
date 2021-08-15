export interface IAnswersProps {
  questionId: number;
  answers: string;
  correctAnswers: string;
  isAnswered: boolean;
  onSelectedAnswersChange: (val: { [key: string]: string[] }) => void;
}