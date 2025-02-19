import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "",
  drawingColor: "#000000",
};

export const canvasColorSlice = createSlice({
  name: "canvasColor",
  initialState,
  reducers: {
    changecanvasColor: (state, action) => {
      state.color = action.payload;
    },
    changedrawingColor: (state, action) => {
      state.drawingColor = action.payload;
    },
  },
});

export const { changecanvasColor, changedrawingColor } =
  canvasColorSlice.actions;

export default canvasColorSlice.reducer;
