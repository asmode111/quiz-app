import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResetQuizSliceState {
  isResetClicked: boolean;
}

const initialState: ResetQuizSliceState = {
  isResetClicked: false,
};

export const resetQuizSlice = createSlice({
  name: "resetQuiz",
  initialState,
  reducers: {
    enableIsResetClicked: (state: any) => {
      state.isResetClicked = true;
    },
    resetIsResetClicked: (state: any) => {
      state.isResetClicked = false;
    }
  }
});

export const { enableIsResetClicked, resetIsResetClicked } = resetQuizSlice.actions;

export default resetQuizSlice.reducer;
