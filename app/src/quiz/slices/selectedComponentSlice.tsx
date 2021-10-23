import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setSelectedComponent: (state: any, action: PayloadAction<number>) => {
      state.selectedComponent = action.payload;
    },
    resetSelectedComponent: (state: any) => {
      state.selectedComponent = 0;
    }
  }
});

export const { setSelectedComponent, resetSelectedComponent } = selectedComponentSlice.actions;

export default selectedComponentSlice.reducer;
