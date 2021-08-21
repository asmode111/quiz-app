import React, { ReactElement } from 'react';
import { Container as ServiceContainer } from 'typedi';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import NavigationButtonsComponent from './components/NavigationButtonsComponent';
import ResetButtonComponent from './components/ResetButtonComponent';
import QuestionComponent from './components/QuestionComponent';
import AnswersComponent from './components/AnswersComponent';
import AnswerResultComponent from './components/AnswerResultComponent';
import InfoComponent from './components/InfoComponent';

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
  const [isExamFinished, setIsQuizFinished]: [boolean, (isExamFinished: boolean) => void] = React.useState<boolean>(false);

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

    setTotalQuestionCount(questionService.getMaxQuestionCount());

    setAnsweredQuestionCount(questionService.getAnsweredQuestionsCount());
    setCorrectAnswersCount(answerService.getCorrectAnswersCount());
  }, []);

  const checkAnswer = () => {
    if (question === null) {
      return;
    }

    questionService.saveAnsweredQuestion(question.id);
    setAnsweredQuestionCount(questionService.getAnsweredQuestionsCount());
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

    if (questionService.isQuizFinished()) {
      setIsQuizFinished(true);
    } else {
      questionService.getRandomQuestion(function (nextQuestion) {
        setQuestion(nextQuestion);
        setAnswerResult(getEmptyAnswerResult());
        setSelectedAnswers([]);
        setIsAnswerSelected(false);
      });
    }
  };

  const resetQuiz = () => {
    const isResetConfirmed = window.confirm('Are you sure to reset the quiz?');
    if (isResetConfirmed == true) {
      questionService.resetData();
      answerService.resetData();
      questionService.getRandomQuestion(function (currentQuestion) {
        setQuestion(currentQuestion);
        setAnswerResult(getEmptyAnswerResult());
        setAnsweredQuestionCount(0);
        setCorrectAnswersCount(0);
        setSelectedAnswers([]);
        setIsAnswerSelected(false);
        setIsQuizFinished(false);
      });
    }
  };

  if (isExamFinished) {
    return (
      <Container fluid className="container mt-5">
        <Row>Quiz is over.</Row>
        <Row>{correctAnswersCount} correct answers out of {totalQuestionCount}.</Row>
        <ResetButtonComponent onResetClick={() => { resetQuiz(); }} />
      </Container>
    );
  }

  return (
    <Container fluid className="container mt-5">
      <Row>
        <InfoComponent
          totalQuestionCount={totalQuestionCount}
          answeredQuestionCount={answeredQuestionCount}
          correctAnswersCount={correctAnswersCount}
        />
      </Row>
      <AnswerResultComponent answerResult={answerResult} />
      {question !== null &&
        <QuestionComponent
          question={question.question}
          questionBody={question.question_body}
        >{{}}</QuestionComponent>
      }
      {question !== null &&
        <AnswersComponent
          questionId={question.id}
          answers={question.answers}
          correctAnswers={question.correct_answers}
          isAnswered={answerResult.isAnswered}
          onSelectedAnswersChange={(selectedAnswers: any) => {
            setSelectedAnswers(selectedAnswers);
            setIsAnswerSelected(true);
          }}
        />
      }
      {answerResult !== null &&
        <NavigationButtonsComponent
          isAnswered={answerResult.isAnswered}
          isAnswerSelected={isAnswerSelected}
          onAnswerClick={() => { checkAnswer(); }}
          onNextClick={() => { getNextQuestion(); }}
        />
      }

      <ResetButtonComponent onResetClick={() => { resetQuiz(); }}>{{}}</ResetButtonComponent>
    </Container >
  );
}

export default Quiz;