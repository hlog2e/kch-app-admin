import { apiInstance } from "@/apis/index";

export const login = async (props) => {
  const { data } = await apiInstance.post("/auth/login", {
    id: props.id,
    pw: props.pw,
  });

  return data;
};
