import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "",
};

export const canvasColorSlice = createSlice({
  name: "canvasColor",
  initialState,
  reducers: {
    changecanvasColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { changecanvasColor } = canvasColorSlice.actions;

export default canvasColorSlice.reducer;
