import { configureStore } from "@reduxjs/toolkit";

import questionReducer from "./slices/questionSlice";
import resetQuizReducer from "./slices/resetQuizSlice";
import selectedAnswersReducer from "./slices/selectedAnswersSlice";

const store = configureStore({
  reducer: {
    question: questionReducer,
    resetQuiz: resetQuizReducer,
    selectedAnswers: selectedAnswersReducer,
  }
});

type RootState = ReturnType<typeof store.getState>;

export const selectQuestion = (state: RootState) => state.question.question;
export const selectIsResetClicked = (state: RootState) => state.resetQuiz.isResetClicked;
export const selectSelectedAnswers = (state: RootState) => state.selectedAnswers.selectedAnswers;

export default store;