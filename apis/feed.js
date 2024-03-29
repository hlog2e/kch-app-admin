import { apiAuthInstance } from "@/apis/index";

export async function getFeedItems() {
  const { data } = await apiAuthInstance.get("/feed");

  return data;
}

export async function postFeedWithImage(props) {
  const { data } = await apiAuthInstance.post("/feed", props.formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function deleteFeed(props) {
  const { data } = await apiAuthInstance.delete("/feed", {
    data: { feedId: props.feedId },
  });

  console.log(data);
  return data;
}
