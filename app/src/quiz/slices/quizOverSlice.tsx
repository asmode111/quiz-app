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
    }
  }
});

export const { setIsQuizOver } = quizOverSlice.actions;

export default quizOverSlice.reducer;
