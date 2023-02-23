import { apiAuthInstance } from "@/apis/index";

export async function getRegisterCodeInfo() {
  const { data } = await apiAuthInstance.get("/register-code/info");

  return data;
}

export async function getRegisterCodes(_isUsed) {
  const { data } = await apiAuthInstance.get("/register-code", {
    params: { isUsed: _isUsed },
  });

  return data;
}

export async function deleteUnUsedRegisterCode(props) {
  const { data } = await apiAuthInstance.delete("/register-code", {
    data: { code: props.code },
  });

  return data;
}
