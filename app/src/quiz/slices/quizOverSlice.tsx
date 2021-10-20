import { createSlice } from "@reduxjs/toolkit";

interface QuizOverSliceState {
  isQuizOver: boolean;
}

const initialState: QuizOverSliceState = {
  isQuizOver: false,
};

export const quizOverSlice = createSlice({
  name: "resetQuiz",
  initialState,
  reducers: {
    setIsQuizOver: (state: any) => {
      state.isQuizOver = true;
    },
    resetIsQuizOver: (state: any) => {
      state.isQuizOver = false;
    }
  }
});

export const { setIsQuizOver, resetIsQuizOver } = quizOverSlice.actions;

export default quizOverSlice.reducer;
