import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedAnswersSliceState {
  selectedAnswers: Array<string>;
}

const initialState: SelectedAnswersSliceState = {
  selectedAnswers: [],
};

export const selectedAnswersSlice = createSlice({
  name: "selectedAnswers",
  initialState,
  reducers: {
    setSelectedAnswers: (state: any, action: PayloadAction<string>) => {
      state.selectedAnswers = [...state.selectedAnswers, action.payload];
    },
    resetSelectedAnswers: (state: any) => {
      state.selectedAnswers = [];
    },
    removeSelectedAnswer: (state: any, action: PayloadAction<string>) => {
      state.selectedAnswers = state.selectedAnswers.filter(function (ele: string) {
        return ele != action.payload;
      });
    }
  }
});

export const { setSelectedAnswers, resetSelectedAnswers, removeSelectedAnswer } = selectedAnswersSlice.actions;

export default selectedAnswersSlice.reducer;
