import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme";
import canvasColorReducer from "./features/canvasColor";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    canvasColor: canvasColorReducer,
  },
});
