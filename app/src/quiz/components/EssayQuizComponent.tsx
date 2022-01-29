import React, { ReactElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container as ServiceContainer } from "typedi";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { 
  selectQuestion,
  selectEssayAnswer, 
  selectCorrectAnswersCount,
  selectMaxQuestionCount,
  selectAnswerResult,
  selectIsQuizOver
} from "../store";
import { setQuestion } from "../slices/questionSlice";
import { setIsResetClicked } from "../slices/resetQuizSlice";
import { setIsQuizOver } from "../slices/quizOverSlice";
import { resetEssayAnswer } from "../slices/essayAnswerSlice";
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
import EssayAnswersComponent from "./features/EssayAnswersComponent";
import AnswerResultComponent from "./features/AnswerResultComponent";
import InfoComponent from "./features/InfoComponent";

import { QuestionService } from "../services/QuestionService";
const questionService = ServiceContainer.get(QuestionService);

import { AnswerService } from "../services/AnswerService";
const answerService = ServiceContainer.get(AnswerService);

function EssayQuizComponent(props: IEssayQuizComponentProps): ReactElement {
  const dispatch = useDispatch();
  const question = useSelector(selectQuestion);
  const givenEssayAnswer = useSelector(selectEssayAnswer);
  const correctAnswersCount = useSelector(selectCorrectAnswersCount);
  const maxQuestionCount = useSelector(selectMaxQuestionCount);
  const answeredQuestionCount = questionService.getAnsweredQuestionsCount();
  const answerResult = useSelector(selectAnswerResult);
  const isQuizOver = useSelector(selectIsQuizOver);

  questionService.getMaxEssayQuestionCount(function (maxQuestionCount: number) {
    dispatch(setMaxQuestionCount(maxQuestionCount));
  });

  React.useEffect(() => {
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
  }, []);

  const checkAnswer = () => {
    if (question === null) {
      return;
    }

    questionService.saveAnsweredQuestion(question.id);
    getQuestion(null, () => ({}));

    if (!answerService.isEssayAnswerCorrect(givenEssayAnswer, question.correct_answers)) {
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

    if (!questionService.isQuizFinished(maxQuestionCount)) {
      getQuestion(question, function (nextQuestion: IQuestion) {
        dispatch(setQuestion(nextQuestion));
        dispatch(resetAnswerResult());
        dispatch(resetEssayAnswer());
        dispatch(resetIsAnswerSelected());
        questionService.saveAnsweredQuestion(question.id);
      });
    } else {
      dispatch(setIsQuizOver());
    }
  };

  const resetQuiz = () => {
    const isResetConfirmed = window.confirm("Are you sure to reset the quiz?");
    if (isResetConfirmed == true) {
      dispatch(setIsResetClicked());
      questionService.resetData();
      answerService.resetData();
      dispatch(resetAnswerResult());
      dispatch(resetCorrectAnswersCount());
      dispatch(resetEssayAnswer());
      props.onQuizReset();
    }
  };

  const getQuestion = (currentQuestion: IQuestion | null, callback: (question: IQuestion) => void): void => {
    if (answeredQuestionCount === 0 || currentQuestion === null) {
      questionService.getFirstEssayQuestion(function (question: IQuestion) {
        callback(question);
      });
    } else {
      questionService.getNextEssayQuestion(currentQuestion.id, function (question: IQuestion) {
        callback(question);
      });
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
        <EssayAnswersComponent
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
          onNextClick={() => { getNextQuestion(); }}
        />
      }
      <ResetButtonComponent onResetClick={() => { resetQuiz(); }} />
    </Container >
  );
}

export default EssayQuizComponent;
