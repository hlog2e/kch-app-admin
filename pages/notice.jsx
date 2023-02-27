import styled from "styled-components";
import Layout from "@/components/Layout/Layout";

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const NoticeCol = styled.div`
  @media (max-width: 768px) {
    margin-top: 20px;
  }
  @media (min-width: 768px) {
    margin-left: 20px;
  }

  display: flex;
  flex-wrap: wrap;
  flex: 4;
`;

export default function Notice() {
  return (
    <Layout>
      <Wrapper>
        <Form />
        <NoticeCol>
          <NoticeItem />
          <NoticeItem />
          <NoticeItem />
          <NoticeItem />
          <NoticeItem />
          <NoticeItem />
          <NoticeItem /> <NoticeItem /> <NoticeItem /> <NoticeItem />
          <NoticeItem />
        </NoticeCol>
      </Wrapper>
    </Layout>
  );
}

const Item = styled.div`
  height: 300px;
  width: 250px;
  background-color: white;
  border-radius: 15px;
  margin-right: 20px;
  margin-bottom: 20px;
`;
function NoticeItem() {
  return <Item />;
}

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  min-width: 300px;
  flex: 1;
  border-radius: 10px;
  height: fit-content;
  padding: 16px;
`;
const FormTitle = styled.p`
  font-weight: 600;
  font-size: 20px;
`;

const FormInput = styled.input`
  border-bottom: gray;
  border: 1px;

  &:focus {
    outline: none;
  }

  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 12px;
`;

const FormTextarea = styled.textarea`
  border-bottom: gray;
  border: 1px;

  &:focus {
    outline: none;
  }
  resize: none;
  height: 400px;

  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
`;

const FormButton = styled.div`
  background-color: #60a5fa;
  color: white;
  font-weight: 600;
  height: 40px;
  border-radius: 10px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
function Form() {
  return (
    <FormBox>
      <FormTitle>공지 등록하기</FormTitle>
      <FormInput placeholder={"제목"} />
      <FormTextarea placeholder={"내용"} />
      <FormInput placeholder={"작성자"} />
      <FormButton>
        <p>작성하기</p>
      </FormButton>
    </FormBox>
  );
}
