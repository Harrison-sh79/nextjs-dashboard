/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* Instruments */
import { getSummaryAsync } from "./thunks";

const initialState: SummarySliceState = {
  summary: {
    average_order_per_customer: 0,
    brand_id: 0,
    click_through_rate: 0,
    conversion_rate: 0,
    customer_number: 0,
    id: 0,
    order_number: 0,
    sales_amount: 0,
    visit_number: 0,
  },
  status: "idle",
};

export const summarySlice = createSlice({
  name: "summary",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getSummaryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSummaryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.summary = { ...state.summary, ...action.payload };
      });
  },
});

/* Types */
export interface SummarySliceState {
  summary: {
    average_order_per_customer: number;
    brand_id: number;
    click_through_rate: number;
    conversion_rate: number;
    customer_number: number;
    id: number;
    order_number: number;
    sales_amount: number;
    visit_number: number;
  };
  status: "idle" | "loading" | "failed";
}