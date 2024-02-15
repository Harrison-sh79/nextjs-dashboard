const BASE_URL = "https://test-api.v-max.shop";

export const fetchSummaryData = async (
  brand_id = 1
): Promise<{ data: object }> => {
  const response = await fetch(`${BASE_URL}/summary?brand_id=${brand_id}`);
  const result = await response.json();

  return result;
};
