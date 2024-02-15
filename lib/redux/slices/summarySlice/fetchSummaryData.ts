import { summaryNumType } from "@/lib/types";

const BASE_URL = "https://test-api.v-max.shop";

export const fetchSummaryData = async (
  brand_id = 1
): Promise<{ data: summaryNumType }> => {
  const response = await fetch(
    `https://test-api.v-max.shop/summary?brand_id=${brand_id}`
  );
  const result = await response.json();
  return result;
};
