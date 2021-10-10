import { configureStore } from "@reduxjs/toolkit";

import questionReducer from "./slices/questionSlice";
import resetQuizReducer from "./slices/resetQuizSlice";
import selectedAnswersReducer from "./slices/selectedAnswersSlice";
import answerSelectedReducer from "./slices/answerSelectedSlice";
import correctAnswersCountReducer from "./slices/correctAnswersCountSlice";

const store = configureStore({
  reducer: {
    question: questionReducer,
    resetQuiz: resetQuizReducer,
    selectedAnswers: selectedAnswersReducer,
    answerSelected: answerSelectedReducer,
    correctAnswersCount: correctAnswersCountReducer
  }
});

type RootState = ReturnType<typeof store.getState>;

export const selectQuestion = (state: RootState) => state.question.question;
export const selectIsResetClicked = (state: RootState) => state.resetQuiz.isResetClicked;
export const selectSelectedAnswers = (state: RootState) => state.selectedAnswers.selectedAnswers;
export const selectIsAnswerSelected = (state: RootState) => state.answerSelected.isAnswerSelected;
export const selectCorrectAnswersCount = (state: RootState) => state.correctAnswersCount.correctAnswersCount;

export default store;