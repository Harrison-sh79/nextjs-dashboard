/* Instruments */
import { counterSlice, headerSlice, summarySlice } from "./slices";

export const reducer = {
  counter: counterSlice.reducer,
  header: headerSlice.reducer,
  summary: summarySlice.reducer,
};
