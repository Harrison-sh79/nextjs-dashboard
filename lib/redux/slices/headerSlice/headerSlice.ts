/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: HeaderSliceState = {
  open: true,
  title: typeof window !== 'undefined'? (localStorage.getItem('selectedTitle')? localStorage.getItem('selectedTitle'):'Test') : 'Dashboard',
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleDrawer: (state) => {
      state.open = !state.open;
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      localStorage.setItem('selectedTitle', action.payload);
    },
  },
});

/* Types */
export interface HeaderSliceState {
  open: boolean;
  title: string | null;
}
