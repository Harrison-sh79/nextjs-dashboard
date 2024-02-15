"use client";
import { Box } from "@mui/material";
import React from "react";
/* Instruments */
import {
  useSelector,
  useDispatch,
  summaryData,
  getSummaryAsync,
} from "@/lib/redux";

type summaryType = {
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

function Orders() {
  const dispatch = useDispatch();
  const result = useSelector(summaryData);
  const [summaryNums, setSummaryNums] = React.useState<summaryType>();
  React.useEffect(() => {
    dispatch(getSummaryAsync(1)).then(() => {
      console.log(result);
      setSummaryNums(result);
      // setSummaryNums({ summary: {...result}, status: 'idle'})
    });
     console.log(summaryNums)
  }, []);
  return <Box>Orders</Box>;
}

export default Orders;
