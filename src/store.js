import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme";
import canvasColorReducer from "./features/canvasColor";
import toolbarReducer from "./features/toolbarSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    canvasColor: canvasColorReducer,
    toolbar: toolbarReducer,
  },
});
