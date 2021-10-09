import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionSliceState {
  question: IQuestion|null;
}

const initialState: QuestionSliceState = {
  question: null,
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestion: (state: any, action: PayloadAction<IQuestion>) => {
      state.question = action.payload;
    }
  }
});

export const { setQuestion } = questionSlice.actions;

export default questionSlice.reducer;
