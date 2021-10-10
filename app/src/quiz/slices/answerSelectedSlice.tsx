import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnswerSelectedSliceState {
  isAnswerSelected: boolean;
}

const initialState: AnswerSelectedSliceState = {
  isAnswerSelected: false,
};

export const answerSelectedSlice = createSlice({
  name: "answerSelected",
  initialState,
  reducers: {
    enableIsAnswerSelected: (state: any) => {
      state.isAnswerSelected = true;
    },
    resetIsAnswerSelected: (state: any) => {
      state.isAnswerSelected = false;
    }
  }
});

export const { enableIsAnswerSelected, resetIsAnswerSelected } = answerSelectedSlice.actions;

export default answerSelectedSlice.reducer;
