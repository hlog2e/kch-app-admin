import { apiAuthInstance } from "@/apis/index";

export async function getStudentsByGradeAndClass(_grade, _class) {
  const { data } = await apiAuthInstance.get("/user/gradeAndClass", {
    params: { grade: _grade, class: _class },
  });

  return data;
}
