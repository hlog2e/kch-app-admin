import Layout from "@/components/Layout";
import styled from "styled-components";

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
  return (
    <Layout>
      <WrapStudentManage>
        <HeaderRow>
          <HeaderItem title={"2학년 5반 가입자 수"} content={"12명"} />
        </HeaderRow>
        <ClassSelectRow>
          <ClassSelectButtons />
        </ClassSelectRow>
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
  background-color: #f4f4f4;
  border-radius: 8px;
  height: 100%;

  min-width: 70px;
  margin-left: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  font-size: 14px;
  cursor: pointer;
`;

function ClassSelectButtons() {
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
          <ClassSelectButton>
            <p>{props.grade + "학년 " + props.class + "반"}</p>
          </ClassSelectButton>
        );
      })}
    </ClassSelectButtonRow>
  );
}
