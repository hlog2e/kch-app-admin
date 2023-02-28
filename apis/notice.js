import { apiAuthInstance } from "@/apis/index";

export async function getNotices() {
  const { data } = await apiAuthInstance.get("/notice");

  return data;
}

export async function postNotice(props) {
  const { data } = await apiAuthInstance.post("/notice", {
    title: props.title,
    content: props.content,
    writer: props.writer,
  });

  return data;
}
