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
    setIsResetClicked: (state: any, action: PayloadAction<boolean>) => {
        state.isResetClicked = action.payload;
      }
    }
  });
  
  export const { setIsResetClicked } = resetQuizSlice.actions;

  export default resetQuizSlice.reducer;
