import Layout from "@/components/Layout";
import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "react-query";
import moment from "moment";
import { getStudentsByGradeAndClass } from "@/apis/user";
import Header from "@/components/Header";
import SelectionBox from "@/components/SelectionBox";

const WrapStudentManage = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Student() {
  const [classInfo, setClassInfo] = useState({
    grade: 1,
    class: 1,
    value: "1학년 1반",
  });
  const { data } = useQuery(["StudentOfClass", classInfo], () => {
    return getStudentsByGradeAndClass(classInfo.grade, classInfo.class);
  });

  return (
    <Layout>
      <WrapStudentManage>
        <Header
          data={[
            {
              title: "선택한 학급",
              content: classInfo.grade + "-" + classInfo.class,
            },
            {
              title: "가입자 수",
              content: data ? data.length + "명" : "0명",
            },
          ]}
        />
        <SelectionBox
          selected={classInfo}
          setSelected={setClassInfo}
          array={[
            { grade: 1, class: 1, value: "1학년 1반" },
            { grade: 1, class: 2, value: "1학년 2반" },
            { grade: 1, class: 3, value: "1학년 3반" },
            { grade: 1, class: 4, value: "1학년 4반" },
            { grade: 1, class: 5, value: "1학년 5반" },
            { grade: 1, class: 6, value: "1학년 6반" },
            { grade: 1, class: 7, value: "1학년 7반" },
            { grade: 1, class: 8, value: "1학년 8반" },
            { grade: 1, class: 9, value: "1학년 9반" },
            { grade: 2, class: 1, value: "2학년 1반" },
            { grade: 2, class: 2, value: "2학년 2반" },
            { grade: 2, class: 3, value: "2학년 3반" },
            { grade: 2, class: 4, value: "2학년 4반" },
            { grade: 2, class: 5, value: "2학년 5반" },
            { grade: 2, class: 6, value: "2학년 6반" },
            { grade: 2, class: 7, value: "2학년 7반" },
            { grade: 2, class: 8, value: "2학년 8반" },
            { grade: 2, class: 9, value: "2학년 9반" },
            { grade: 3, class: 1, value: "3학년 1반" },
            { grade: 3, class: 2, value: "3학년 2반" },
            { grade: 3, class: 3, value: "3학년 3반" },
            { grade: 3, class: 4, value: "3학년 4반" },
            { grade: 3, class: 5, value: "3학년 5반" },
            { grade: 3, class: 6, value: "3학년 6반" },
            { grade: 3, class: 7, value: "3학년 7반" },
            { grade: 3, class: 8, value: "3학년 8반" },
            { grade: 3, class: 9, value: "3학년 9반" },
          ]}
        />
        {data ? (
          <StudentsRow>
            {data.map((props) => {
              return <StudentItem key={props._id} userData={props} />;
            })}
          </StudentsRow>
        ) : null}
      </WrapStudentManage>
    </Layout>
  );
}

const StudentsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px;
`;

const StudentCard = styled.div`
  background-color: white;
  width: 230px;
  border-radius: 15px;
  padding: 14px;
  margin-right: 12px;
  margin-top: 12px;
`;

const StudentClassText = styled.p`
  font-size: 12px;
  font-weight: 200;
  color: gray;
`;
const StudentName = styled.p`
  margin-top: 6px;
  font-size: 24px;
  font-weight: 600;
`;
const StudentDesc = styled.p`
  margin-top: 6px;
  font-size: 13px;
  font-weight: 300;
`;

function StudentItem({ userData }) {
  return (
    <StudentCard>
      <StudentClassText>
        {userData.grade +
          "학년 " +
          userData.class +
          "반 " +
          userData.number +
          "번"}
      </StudentClassText>
      <StudentName>{userData.name}</StudentName>
      <StudentDesc>ID : {userData._id}</StudentDesc>
      <StudentDesc>전화번호 : {userData.phone_number}</StudentDesc>
      <StudentDesc>
        푸시알림 :{" "}
        {userData.notifications.length > 0
          ? userData.notifications.join(", ")
          : "수신거부"}
      </StudentDesc>
      <StudentDesc>
        바코드 : {userData.barcode ? userData.barcode : "미등록"}
      </StudentDesc>
      <StudentDesc>
        사진 :{" "}
        {userData.photo ? (
          <a href={userData.photo}>{userData.photo}</a>
        ) : (
          "미등록"
        )}
      </StudentDesc>
      <StudentDesc>
        가입일시 : {moment(userData.createdAt).format("YYYY-MM-DD hh:mm:ss")}
      </StudentDesc>
    </StudentCard>
  );
}
