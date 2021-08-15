import React, { ReactElement } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import NavigationButtons from './NavigationButtons';
import Question from './Question';
import Answers from './Answers';
import AnswerAlert from './AnswerAlert';

import { IQuestion } from './interfaces/IQuestion';
import { IAnswerResult } from './interfaces/IAnswerResult';

import { getCurrentQuestion, loadNextQuestion } from './services/QuestionService';

import './Quiz.css';

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

  React.useEffect(() => {
    getCurrentQuestion(function (currentQuestion) {
      setQuestion(currentQuestion);
    });
  }, []);

  const checkAnswer = () => {
    if (question === null) {
      return;
    }

    const intersection = selectedAnswers.filter((x: string) => !question.correct_answers.includes(x));
    if (selectedAnswers.length !== question.correct_answers.length || intersection.length != 0) {
      setAnswerResult({
        isAnswered: true,
        isCorrect: false,
        message: 'Your answer is not correct! The correct answer is ' + question.correct_answers
      });
      return;
    }

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

    loadNextQuestion(question.id, function (nextQuestion) {
      setQuestion(nextQuestion);
      setAnswerResult(getEmptyAnswerResult());
      setSelectedAnswers([]);
      setIsAnswerSelected(false);
    });
  };

  return (
    <Container fluid className="container mt-5">
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