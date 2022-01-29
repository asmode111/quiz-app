import { configureStore } from "@reduxjs/toolkit";

import questionReducer from "./slices/questionSlice";
import resetQuizReducer from "./slices/resetQuizSlice";
import selectedAnswersReducer from "./slices/selectedAnswersSlice";
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
    correctAnswersCount: correctAnswersCountReducer,
    maxQuestionCount: maxQuestionCountReducer,
    answerResult: answerResultSliceReducer,
    quizOver: quizOverSliceReducer,
    selectedComponent: selectedComponentSliceReducer,
    essayAnswer: essayAnswerSliceReducer
  }
});

type RootState = ReturnType<typeof store.getState>;

export const selectQuestion = (state: RootState): IQuestion|null => state.question.question;
export const selectIsResetClicked = (state: RootState): boolean => state.resetQuiz.isResetClicked;
export const selectSelectedAnswers = (state: RootState): Array<string> => state.selectedAnswers.selectedAnswers;
export const selectCorrectAnswersCount = (state: RootState): number => state.correctAnswersCount.correctAnswersCount;
export const selectMaxQuestionCount = (state: RootState): number => state.maxQuestionCount.maxQuestionCount;
export const selectAnswerResult = (state: RootState): IAnswerResult => state.answerResult.answerResult;
export const selectIsQuizOver = (state: RootState): boolean => state.quizOver.isQuizOver;
export const selectSelectedComponent = (state: RootState): number => state.selectedComponent.selectedComponent;
export const selectEssayAnswer = (state: RootState): string | null => state.essayAnswer.essayAnswer;

export default store;