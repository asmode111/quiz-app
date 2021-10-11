import React, { ReactElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container as ServiceContainer } from "typedi";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { 
  selectQuestion, 
  selectIsResetClicked, 
  selectSelectedAnswers, 
  selectIsAnswerSelected,
  selectCorrectAnswersCount,
  selectAnswerResult
} from "./store";
import { setQuestion } from "./slices/questionSlice";
import { enableIsResetClicked, resetIsResetClicked } from "./slices/resetQuizSlice";
import { resetSelectedAnswers } from "./slices/selectedAnswersSlice";
import { enableIsAnswerSelected, resetIsAnswerSelected } from "./slices/answerSelectedSlice";
import { setCorrectAnswersCount, resetCorrectAnswersCount } from "./slices/correctAnswersCountSlice";
import {
  resetAnswerResult,
  setWrongAnswerResult,
  setCorrectAnswerResult 
} from "./slices/answerResultSlice";

import NavigationButtonsComponent from "./components/NavigationButtonsComponent";
import ResetButtonComponent from "./components/ResetButtonComponent";
import QuestionComponent from "./components/QuestionComponent";
import AnswersComponent from "./components/AnswersComponent";
import AnswerResultComponent from "./components/AnswerResultComponent";
import InfoComponent from "./components/InfoComponent";
import TimerComponent from "./components/TimerComponent";

import { QuestionService } from "./services/QuestionService";
const questionService = ServiceContainer.get(QuestionService);

import { AnswerService } from "./services/AnswerService";
const answerService = ServiceContainer.get(AnswerService);

import { TimerService } from "./services/TimerService";
const timerService = ServiceContainer.get(TimerService);

import "./assets/Quiz.css";

function Quiz(): ReactElement {
  const dispatch = useDispatch();
  const question = useSelector(selectQuestion);
  const isResetClicked = useSelector(selectIsResetClicked);
  const selectedAnswers = useSelector(selectSelectedAnswers);
  const isAnswerSelected = useSelector(selectIsAnswerSelected);
  const correctAnswersCount = useSelector(selectCorrectAnswersCount);
  const totalQuestionCount = questionService.getMaxQuestionCount();
  const answeredQuestionCount = questionService.getAnsweredQuestionsCount();
  const answerResult = useSelector(selectAnswerResult);

  const [timer, setTimer]: [ITimer, (timer: ITimer) => void] = React.useState<ITimer>(timerService.getTimer());

  React.useEffect(() => {
    questionService.getCurrentQuestion(function (currentQuestion: IQuestion | null) {
      if (currentQuestion) {
        dispatch(setQuestion(currentQuestion));
      } else {
        questionService.getRandomQuestion(function (currentQuestion: IQuestion) {
          dispatch(setQuestion(currentQuestion));
        });
      }
    });

    dispatch(setCorrectAnswersCount(answerService.getCorrectAnswersCount()));
    dispatch(resetAnswerResult());
  }, []);

  const checkAnswer = () => {
    if (question === null) {
      return;
    }

    questionService.saveAnsweredQuestion(question.id);
    questionService.getRandomQuestion(() => ({}));

    if (answerService.isAnswerCorrect(selectedAnswers, question.correct_answers)) {
      dispatch(setWrongAnswerResult(question.correct_answers));
      return;
    }

    dispatch(setCorrectAnswersCount(answerService.incrementCorrectAnswersCount()));
    dispatch(setCorrectAnswerResult());
  };

  const getNextQuestion = () => {
    if (question === null) {
      return;
    }

    if (!questionService.isQuizFinished()) {
      questionService.getRandomQuestion(function (nextQuestion: IQuestion) {
        dispatch(setQuestion(nextQuestion));
        dispatch(resetAnswerResult());
        dispatch(resetSelectedAnswers());
        dispatch(resetIsAnswerSelected());
      });
    }
  };

  const resetQuiz = () => {
    const isResetConfirmed = window.confirm("Are you sure to reset the quiz?");
    if (isResetConfirmed == true) {
      dispatch(enableIsResetClicked());
      // timerService.resetTimer();
      // setTimer(timerService.getTimer());
      questionService.resetData();
      answerService.resetData();
      questionService.getRandomQuestion(function (currentQuestion: IQuestion) {
        dispatch(setQuestion(currentQuestion));
        dispatch(resetAnswerResult());
        dispatch(resetCorrectAnswersCount());
        dispatch(resetSelectedAnswers());
        dispatch(resetIsAnswerSelected());
      });
    }
  };

  if (questionService.isQuizFinished()) {
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
        <TimerComponent 
          onTimerReset={() => { dispatch(resetIsResetClicked()); }}
          onUpdateTimer={(updatedTime: any) => { 
            timerService.updateTimer(updatedTime);
          }}
          isResetClicked={isResetClicked}
          timer={timer}
        />
      </Row>
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
          onIsAnswerSelected={() => {
            dispatch(enableIsAnswerSelected());
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
