import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CorrectAnswersCountSliceState {
  correctAnswersCount: number;
}

const initialState: CorrectAnswersCountSliceState = {
  correctAnswersCount: 0,
};

export const correctAnswersCountSlice = createSlice({
  name: "correctAnswersCount",
  initialState,
  reducers: {
    setCorrectAnswersCount: (state: any, action: PayloadAction<number>) => {
      state.correctAnswersCount = action.payload;
    },
    resetCorrectAnswersCount: (state: any) => {
      state.correctAnswersCount = 0;
    }
  }
});

export const { 
  setCorrectAnswersCount, 
  resetCorrectAnswersCount
} = correctAnswersCountSlice.actions;

export default correctAnswersCountSlice.reducer;
