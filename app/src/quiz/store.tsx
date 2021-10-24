import { configureStore } from "@reduxjs/toolkit";

import questionReducer from "./slices/questionSlice";
import resetQuizReducer from "./slices/resetQuizSlice";
import selectedAnswersReducer from "./slices/selectedAnswersSlice";
import answerSelectedReducer from "./slices/answerSelectedSlice";
import correctAnswersCountReducer from "./slices/correctAnswersCountSlice";
import maxQuestionCountReducer from "./slices/maxQuestionCountSlice";
import answerResultSliceReducer from "./slices/answerResultSlice";
import quizOverSliceReducer from "./slices/quizOverSlice";
import selectedComponentSliceReducer from "./slices/selectedComponentSlice";
import essayAnswerSliceReducer from "./slices/essayAnswerSlice";

const store = configureStore({
  reducer: {
    question: questionReducer,
    resetQuiz: resetQuizReducer,
    selectedAnswers: selectedAnswersReducer,
    answerSelected: answerSelectedReducer,
    correctAnswersCount: correctAnswersCountReducer,
    maxQuestionCount: maxQuestionCountReducer,
    answerResult: answerResultSliceReducer,
    quizOver: quizOverSliceReducer,
    selectedComponent: selectedComponentSliceReducer,
    essayAnswer: essayAnswerSliceReducer
  }
});

type RootState = ReturnType<typeof store.getState>;

export const selectQuestion = (state: RootState) => state.question.question;
export const selectIsResetClicked = (state: RootState) => state.resetQuiz.isResetClicked;
export const selectSelectedAnswers = (state: RootState) => state.selectedAnswers.selectedAnswers;
export const selectIsAnswerSelected = (state: RootState) => state.answerSelected.isAnswerSelected;
export const selectCorrectAnswersCount = (state: RootState) => state.correctAnswersCount.correctAnswersCount;
export const selectMaxQuestionCount = (state: RootState) => state.maxQuestionCount.maxQuestionCount;
export const selectAnswerResult = (state: RootState) => state.answerResult.answerResult;
export const selectIsQuizOver = (state: RootState) => state.quizOver.isQuizOver;
export const selectSelectedComponent = (state: RootState) => state.selectedComponent.selectedComponent;
export const selectEssayAnswer = (state: RootState) => state.essayAnswer.essayAnswer;

export default store;