import { createSlice } from "@reduxjs/toolkit";

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
    setIsResetClicked: (state: ResetQuizSliceState) => {
      state.isResetClicked = true;
    },
    resetIsResetClicked: (state: ResetQuizSliceState) => {
      state.isResetClicked = false;
    }
  }
});

export const { setIsResetClicked, resetIsResetClicked } = resetQuizSlice.actions;

export default resetQuizSlice.reducer;
