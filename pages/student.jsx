import Layout from "@/components/Layout";
import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "react-query";
import moment from "moment";
import { getStudentsByGradeAndClass } from "@/apis/user";

const WrapStudentManage = styled.div`
  display: flex;
  flex-direction: column;
`;
const HeaderRow = styled.div`
  padding-top: 12px;
  padding-bottom: 12px;
  display: flex;
  width: 100%;
  overflow: scroll;
`;

export default function Student() {
  const [classInfo, setClassInfo] = useState({ grade: 1, class: 1 });
  const { data } = useQuery(["StudentOfClass", classInfo], () => {
    return getStudentsByGradeAndClass(classInfo.grade, classInfo.class);
  });

  return (
    <Layout>
      <WrapStudentManage>
        <HeaderRow>
          <HeaderItem
            title={"선택한 학급"}
            content={classInfo.grade + "-" + classInfo.class}
          />
          <HeaderItem
            title={"가입자 수"}
            content={data ? data.length + "명" : "0명"}
          />
        </HeaderRow>
        <ClassSelectRow>
          <ClassSelectButtons
            classInfo={classInfo}
            setClassInfo={setClassInfo}
          />
        </ClassSelectRow>
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

const HeaderItemBox = styled.div`
  margin-left: 12px;
  background-color: white;
  border-radius: 15px;
  height: 110px;
  width: 150px;
  min-width: 150px;
  padding: 14px;
`;
const HeaderItemTitle = styled.p`
  font-size: 14px;
  font-weight: 300;
`;
const HeaderItemContent = styled.p`
  margin-top: 10px;
  font-size: 36px;
  font-weight: 600;
`;
function HeaderItem({ title, content }) {
  return (
    <HeaderItemBox>
      <HeaderItemTitle>{title}</HeaderItemTitle>
      <HeaderItemContent>{content}</HeaderItemContent>
    </HeaderItemBox>
  );
}

const ClassSelectRow = styled.div`
  padding: 16px;
`;
const ClassSelectButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  overflow: scroll;
  background-color: white;
  border-radius: 12px;
  height: 40px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 12px;
`;
const ClassSelectButton = styled.div`
  border-radius: 8px;
  height: 100%;
  background-color: ${(props) => {
    return props.active ? "#dbeafe" : "#f4f4f4";
  }};
  color: ${(props) => {
    return props.active ? "#60a5fa" : "gray";
  }};
  min-width: 70px;
  margin-left: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
`;

function ClassSelectButtons({ classInfo, setClassInfo }) {
  const classArray = [
    { grade: 1, class: 1 },
    { grade: 1, class: 2 },
    { grade: 1, class: 3 },
    { grade: 1, class: 4 },
    { grade: 1, class: 5 },
    { grade: 1, class: 6 },
    { grade: 1, class: 7 },
    { grade: 1, class: 8 },
    { grade: 1, class: 9 },
    { grade: 2, class: 1 },
    { grade: 2, class: 2 },
    { grade: 2, class: 3 },
    { grade: 2, class: 4 },
    { grade: 2, class: 5 },
    { grade: 2, class: 6 },
    { grade: 2, class: 7 },
    { grade: 2, class: 8 },
    { grade: 2, class: 9 },
    { grade: 3, class: 1 },
    { grade: 3, class: 2 },
    { grade: 3, class: 3 },
    { grade: 3, class: 4 },
    { grade: 3, class: 5 },
    { grade: 3, class: 6 },
    { grade: 3, class: 7 },
    { grade: 3, class: 8 },
    { grade: 3, class: 9 },
  ];
  return (
    <ClassSelectButtonRow>
      {classArray.map((props) => {
        return (
          <ClassSelectButton
            key={String(props.grade) + String(props.class)}
            active={
              props.grade === classInfo.grade && props.class === classInfo.class
            }
            onClick={() => {
              setClassInfo(props);
            }}
          >
            <p>{props.grade + "학년 " + props.class + "반"}</p>
          </ClassSelectButton>
        );
      })}
    </ClassSelectButtonRow>
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
