import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const SELECT_QUIZ_COMPONENT = 0;
export const SELECTABLE_RANDOM_QUIZ_COMPONENT = 1;
export const SELECTABLE_ALL_QUIZ_COMPONENT = 2;
export const ESSAY_QUIZ_COMPONENT = 3;

interface SelectedComponentSliceState {
  selectedComponent: number;
}

const initialState: SelectedComponentSliceState = {
  selectedComponent: 0,
};

export const selectedComponentSlice = createSlice({
  name: "selectedComponent",
  initialState,
  reducers: {
    setSelectedComponent: (state: SelectedComponentSliceState, action: PayloadAction<number>) => {
      state.selectedComponent = action.payload;
    },
    resetSelectedComponent: (state: SelectedComponentSliceState) => {
      state.selectedComponent = 0;
    }
  }
});

export const { setSelectedComponent, resetSelectedComponent } = selectedComponentSlice.actions;

export default selectedComponentSlice.reducer;
