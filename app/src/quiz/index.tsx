import React, { ReactElement } from 'react';
import { Container as ServiceContainer } from 'typedi';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import NavigationButtons from './components/NavigationButtons';
import Question from './components/Question';
import Answers from './components/Answers';
import AnswerAlert from './components/AnswerAlert';
import Info from './components/Info';

import { QuestionService } from './services/QuestionService';
const questionService = ServiceContainer.get(QuestionService);

import { AnswerService } from './services/AnswerService';
const answerService = ServiceContainer.get(AnswerService);

import { IQuestion } from './interfaces/IQuestion';
import { IAnswerResult } from './interfaces/IAnswerResult';

import './assets/Quiz.css';

function getEmptyAnswerResult(): IAnswerResult {
  return {
    isAnswered: false,
    isCorrect: false,
    message: ''
  };
}

function Quiz(): ReactElement {
  const [question, setQuestion] = React.useState<IQuestion | null>(null);
  const [selectedAnswers, setSelectedAnswers] = React.useState<any>([]);
  const [answerResult, setAnswerResult] = React.useState<IAnswerResult>(getEmptyAnswerResult());
  const [isAnswerSelected, setIsAnswerSelected]: [boolean, (isAnswerSelected: boolean) => void] = React.useState<boolean>(false);
  const [totalQuestionCount, setTotalQuestionCount]: [number, (totalQuestionCount: number) => void] = React.useState<number>(0);
  const [answeredQuestionCount, setAnsweredQuestionCount]: [number, (answeredQuestionCount: number) => void] = React.useState<number>(0);
  const [correctAnswersCount, setCorrectAnswersCount]: [number, (correctAnswersCount: number) => void] = React.useState<number>(0);

  React.useEffect(() => {
    questionService.getCurrentQuestion(function (currentQuestion) {
      if (currentQuestion) {
        setQuestion(currentQuestion);
      } else {
        questionService.getRandomQuestion(function (currentQuestion) {
          setQuestion(currentQuestion);
        });
      }
    });

    questionService.getTotalQuestionCount(function (totalQuestionCount) {
      setTotalQuestionCount(totalQuestionCount);
    });

    setAnsweredQuestionCount(questionService.getAnsweredQuestionsCount());
    setCorrectAnswersCount(answerService.getCorrectAnswersCount());
  }, []);

  const checkAnswer = () => {
    if (question === null) {
      return;
    }

    setAnsweredQuestionCount(questionService.getAnsweredQuestionsCount());
    questionService.saveAnsweredQuestion(question.id);
    questionService.getRandomQuestion(() => ({}));

    if (answerService.isAnswerCorrect(selectedAnswers, question.correct_answers)) {
      setAnswerResult({
        isAnswered: true,
        isCorrect: false,
        message: 'Your answer is not correct! The correct answer is ' + question.correct_answers
      });
      return;
    }

    setCorrectAnswersCount(answerService.incrementCorrectAnswersCount());

    setAnswerResult({
      isAnswered: true,
      isCorrect: true,
      message: 'Your answer is correct!'
    });
  };

  const getNextQuestion = () => {
    if (question === null) {
      return;
    }

    questionService.getRandomQuestion(function (nextQuestion) {
      setQuestion(nextQuestion);
      setAnswerResult(getEmptyAnswerResult());
      setSelectedAnswers([]);
      setIsAnswerSelected(false);
    });
  };

  return (
    <Container fluid className="container mt-5">
      <Row>
        <Info
          totalQuestionCount={totalQuestionCount}
          answeredQuestionCount={answeredQuestionCount}
          correctAnswersCount={correctAnswersCount}
        />
      </Row>
      <Row>
        <AnswerAlert answerResult={answerResult}></AnswerAlert>
      </Row>
      {question !== null &&
        <Row>
          <Question
            question={question.question}
            questionBody={question.question_body}
          >{{}}</Question>
        </Row>
      }
      {question !== null &&
        <Row>
          <Answers
            questionId={question.id}
            answers={question.answers}
            correctAnswers={question.correct_answers}
            isAnswered={answerResult.isAnswered}
            onSelectedAnswersChange={(selectedAnswers: any) => {
              setSelectedAnswers(selectedAnswers);
              setIsAnswerSelected(true);
            }}
          />
        </Row>
      }
      {answerResult !== null &&
        <Row>
          <NavigationButtons
            isAnswered={answerResult.isAnswered}
            isAnswerSelected={isAnswerSelected}
            onAnswerClick={() => { checkAnswer(); }}
            onNextClick={() => { getNextQuestion(); }}
          />
        </Row>
      }
    </Container>
  );
}

export default Quiz;