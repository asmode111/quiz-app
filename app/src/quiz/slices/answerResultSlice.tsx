import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnswerResultSliceState {
  answerResult: IAnswerResult;
}

const initialState: AnswerResultSliceState = {
  answerResult: {
    isAnswered: false,
    isCorrect: false,
    message: ""
  },
};

export const answerResultSlice = createSlice({
  name: "answerResult",
  initialState,
  reducers: {
    resetAnswerResult: (state: any) => {
      state.answerResult = {
        isAnswered: false,
        isCorrect: false,
        message: ""
      };
    },
    setWrongAnswerResult: (state: any, action: PayloadAction<string>) => {
      state.answerResult = {
        isAnswered: true,
        isCorrect: false,
        message: "Wrong! The correct answer is " + action.payload
      };
    },
    setCorrectAnswerResult: (state: any) => {
      state.answerResult = {
        isAnswered: true,
        isCorrect: true,
        message: "Correct!"
      };
    },
  }
});

export const { 
  resetAnswerResult,
  setWrongAnswerResult,
  setCorrectAnswerResult
} = answerResultSlice.actions;

export default answerResultSlice.reducer;
