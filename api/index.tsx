const BASE_URL = "http://localhost:3000";

export const fetchSummaryData = async (
  brand_id = 1
): Promise<{ data: object }> => {
  const response = await fetch(`${BASE_URL}/summary?brand_id=${brand_id}`);
  const result = await response.json();

  return result;
};
