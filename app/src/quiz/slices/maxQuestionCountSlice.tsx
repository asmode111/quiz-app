import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MaxQuestionCountSliceState {
  maxQuestionCount: number;
}

const initialState: MaxQuestionCountSliceState = {
  maxQuestionCount: 0,
};

export const maxQuestionCountSlice = createSlice({
  name: "maxQuestionCount",
  initialState,
  reducers: {
    setMaxQuestionCount: (state: any, action: PayloadAction<number>) => {
      state.maxQuestionCount = action.payload;
    },
  }
});

export const { setMaxQuestionCount } = maxQuestionCountSlice.actions;

export default maxQuestionCountSlice.reducer;
