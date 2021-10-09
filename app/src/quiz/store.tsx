import { configureStore } from "@reduxjs/toolkit";

import questionReducer from "./slices/questionSlice";
import resetQuizReducer from "./slices/resetQuizSlice";

const store = configureStore({
  reducer: {
    question: questionReducer,
    resetQuiz: resetQuizReducer,
  }
});

type RootState = ReturnType<typeof store.getState>;

export const selectQuestion = (state: RootState) => state.question.question;
export const selectResetQuiz = (state: RootState) => state.resetQuiz.isResetClicked;

export default store;