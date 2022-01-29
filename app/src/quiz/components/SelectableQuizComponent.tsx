import React, { ReactElement, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container as ServiceContainer } from "typedi";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { 
  selectQuestion, 
  selectIsResetClicked, 
  selectSelectedAnswers, 
  selectCorrectAnswersCount,
  selectMaxQuestionCount,
  selectAnswerResult,
  selectIsQuizOver
} from "../store";
import { setQuestion } from "../slices/questionSlice";
import { setIsResetClicked, resetIsResetClicked } from "../slices/resetQuizSlice";
import { setIsQuizOver } from "../slices/quizOverSlice";
import { resetSelectedAnswers } from "../slices/selectedAnswersSlice";
import { enableIsAnswerSelected, resetIsAnswerSelected } from "../slices/answerSelectedSlice";
import { setCorrectAnswersCount, resetCorrectAnswersCount } from "../slices/correctAnswersCountSlice";
import { setMaxQuestionCount } from "../slices/maxQuestionCountSlice";
import {
  resetAnswerResult,
  setWrongAnswerResult,
  setCorrectAnswerResult 
} from "../slices/answerResultSlice";

import NavigationButtonsComponent from "./features/NavigationButtonsComponent";
import ResetButtonComponent from "./features/ResetButtonComponent";
import QuestionComponent from "./features/QuestionComponent";
import AnswersComponent from "./features/AnswersComponent";
import AnswerResultComponent from "./features/AnswerResultComponent";
import InfoComponent from "./features/InfoComponent";
import TimerComponent from "./features/TimerComponent";

import { QuestionService } from "../services/QuestionService";
const questionService = ServiceContainer.get(QuestionService);

import { AnswerService } from "../services/AnswerService";
const answerService = ServiceContainer.get(AnswerService);

import { TimerService } from "../services/TimerService";
const timerService = ServiceContainer.get(TimerService);

function SelectableQuizComponent(props: ISelectableQuizComponentProps): ReactElement {
  const dispatch = useDispatch();
  const question = useSelector(selectQuestion);
  const isResetClicked = useSelector(selectIsResetClicked);
  const selectedAnswers = useSelector(selectSelectedAnswers);
  const correctAnswersCount = useSelector(selectCorrectAnswersCount);
  const maxQuestionCount = useSelector(selectMaxQuestionCount);
  const answeredQuestionCount = questionService.getAnsweredQuestionsCount();
  const answerResult = useSelector(selectAnswerResult);
  const isQuizOver = useSelector(selectIsQuizOver);
  const [isAnswerClicked, setIsAnswerClicked] = useState(false);

  questionService.getMaxQuestionCount(props.isRandomQuiz, function (maxQuestionCount: number) {
    dispatch(setMaxQuestionCount(maxQuestionCount));
  });

  React.useEffect(() => {
    if (isTimeout()) {
      dispatch(setIsQuizOver());
    } else {
      questionService.getCurrentQuestion(function (currentQuestion: IQuestion | null) {
        if (currentQuestion) {
          dispatch(setQuestion(currentQuestion));
        } else {
          getQuestion(question, function (currentQuestion: IQuestion) {
            dispatch(setQuestion(currentQuestion));
          });
        }
      });
  
      dispatch(setCorrectAnswersCount(answerService.getCorrectAnswersCount()));
      dispatch(resetAnswerResult());
    }
  }, []);

  const isTimeout = (): boolean => {
    if (!props.isRandomQuiz) {
      return false;
    }

    return timerService.isTimeout();
  };

  const checkAnswer = () => {
    if (question === null) {
      return;
    }

    setIsAnswerClicked(true);
    questionService.saveAnsweredQuestion(question.id);
    getQuestion(null, () => ({}));

    if (!answerService.isAnswerCorrect(selectedAnswers, question.correct_answers)) {
      dispatch(setWrongAnswerResult(question.correct_answers));
      return;
    }

    dispatch(setCorrectAnswersCount(answerService.incrementCorrectAnswersCount()));
    dispatch(setCorrectAnswerResult());
  };

  const checkAnswerSelected = () => {
    if (isAnswerClicked) {
      getNextQuestion();

      return;
    }

    const isResetConfirmed = window.confirm("The current question is not answered. Are you sure to pass to the next question?");
    if (isResetConfirmed) {
      getNextQuestion();
    }

    return;
  };

  const getNextQuestion = () => {
    if (question === null) {
      return;
    }

    if (!isAnswerClicked) {
      questionService.saveAnsweredQuestion(question.id);
    }
    setIsAnswerClicked(false);

    if (!questionService.isQuizFinished(maxQuestionCount) && !isTimeout()) {
      getQuestion(question, function (nextQuestion: IQuestion) {
        dispatch(setQuestion(nextQuestion));
        dispatch(resetAnswerResult());
        dispatch(resetSelectedAnswers());
        dispatch(resetIsAnswerSelected());
      });
    } else {
      dispatch(setIsQuizOver());
    }
  };

  const resetQuiz = () => {
    const isResetConfirmed = window.confirm("Are you sure to reset the quiz?");
    if (isResetConfirmed) {
      dispatch(setIsResetClicked());
      questionService.resetData();
      answerService.resetData();
      timerService.resetTimer();
      dispatch(resetAnswerResult());
      dispatch(resetCorrectAnswersCount());
      dispatch(resetSelectedAnswers());
      props.onQuizReset();
    }
  };

  const getQuestion = (currentQuestion: IQuestion | null, callback: (question: IQuestion) => void): void => {
    if (props.isRandomQuiz) {
      questionService.getRandomQuestion(function (question: IQuestion) {
        callback(question);
      });
    } else {
      if (answeredQuestionCount === 0 || currentQuestion === null) {
        questionService.getFirstQuestion(function (question: IQuestion) {
          callback(question);
        });
      } else {
        questionService.getNextQuestion(currentQuestion.id, function (question: IQuestion) {
          callback(question);
        });
      }
    }
  };

  if (isQuizOver) {
    return (
      <Container fluid className="container mt-5">
        <Row>Quiz is over.</Row>
        <Row>{correctAnswersCount} correct answers out of {maxQuestionCount}.</Row>
        <ResetButtonComponent onResetClick={() => { resetQuiz(); }} />
      </Container>
    );
  }

  return (
    <Container fluid className="container mt-5">
      {props.isRandomQuiz && 
        <Row>
          <TimerComponent 
            isResetClicked={isResetClicked}
            onTimerReset={() => { dispatch(resetIsResetClicked()); }}
          />
        </Row>
      }
      <Row>
        <InfoComponent
          maxQuestionCount={maxQuestionCount}
          answeredQuestionCount={answeredQuestionCount}
          correctAnswersCount={correctAnswersCount}
        />
      </Row>
      <AnswerResultComponent answerResult={answerResult} />
      {question !== null &&
        <QuestionComponent
          questionId={question.id}
          question={question.question}
          questionBody={question.question_body}
        />
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
          onAnswerClick={() => { checkAnswer(); }}
          onNextClick={() => { checkAnswerSelected(); }}
        />
      }
      <ResetButtonComponent onResetClick={() => { resetQuiz(); }} />
    </Container >
  );
}

export default SelectableQuizComponent;
