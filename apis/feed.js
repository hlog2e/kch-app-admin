import { apiAuthInstance } from "@/apis/index";

export async function getFeedItems() {
  const { data } = await apiAuthInstance.get("/feed");

  return data;
}
