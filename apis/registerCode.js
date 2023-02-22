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
