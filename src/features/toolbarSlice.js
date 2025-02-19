import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  height: 83, 
};

export const toolbarSlice = createSlice({
  name: "toolbar",
  initialState,
  reducers: {
    setToolbarHeight: (state, action) => {
      state.height = action.payload;
    },
  },
});

export const { setToolbarHeight } = toolbarSlice.actions;

export default toolbarSlice.reducer;
