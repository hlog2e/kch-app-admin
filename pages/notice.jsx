import styled from "styled-components";
import Layout from "@/components/Layout/Layout";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getNotices, postNotice } from "@/apis/notice";
import { useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

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
  const { data: noticeData } = useQuery("GetNotices", getNotices);

  return (
    <Layout>
      <Wrapper>
        <Form />
        <NoticeCol>
          {noticeData
            ? noticeData.map((_data) => {
                return <NoticeItem key={_data._id} noticeData={_data} />;
              })
            : null}
        </NoticeCol>
      </Wrapper>
    </Layout>
  );
}

const Item = styled.div`
  height: fit-content;
  min-height: 280px;
  width: 250px;
  background-color: white;
  border-radius: 15px;
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 16px;
`;
const NoticeTitle = styled.p`
  font-weight: 600;
  font-size: 18px;
`;
const NoticeWriter = styled.p`
  font-weight: 400;
  font-size: 13px;
  color: gray;
  margin-top: 4px;
`;
const NoticeCreatedAt = styled.p`
  font-weight: 200;
  font-size: 11px;
  color: gray;
  margin-top: 4px;
`;
const NoticeContent = styled.p`
  font-size: 15px;
  font-weight: 200;
  margin-top: 16px;
`;

function NoticeItem({ noticeData }) {
  return (
    <Item>
      <NoticeTitle>{noticeData.title}</NoticeTitle>
      <NoticeWriter>작성자: {noticeData.writer}</NoticeWriter>
      <NoticeCreatedAt>
        작성일시: {moment(noticeData.createdAt).format("YYYY-MM-DD hh:mm:ss A")}
      </NoticeCreatedAt>
      <NoticeContent>{noticeData.content}</NoticeContent>
    </Item>
  );
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

  height: 270px;

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
  const [inputData, setInputData] = useState({
    title: "",
    content: "",
    writer: "",
  });

  const queryClient = useQueryClient();
  const { mutate: addNoticeMutate } = useMutation(postNotice);
  return (
    <FormBox>
      <FormTitle>공지 등록하기</FormTitle>
      <FormInput
        value={inputData.title}
        onChange={(e) => {
          setInputData({ ...inputData, title: e.target.value });
        }}
        placeholder={"제목"}
      />
      <FormTextarea
        value={inputData.content}
        onChange={(e) => {
          setInputData({ ...inputData, content: e.target.value });
        }}
        placeholder={"내용"}
      />
      <FormInput
        value={inputData.writer}
        onChange={(e) => {
          setInputData({ ...inputData, writer: e.target.value });
        }}
        placeholder={"작성자"}
      />
      <FormButton
        onClick={() => {
          if (
            inputData.title.length > 0 &&
            inputData.content.length > 0 &&
            inputData.writer.length > 0
          ) {
            addNoticeMutate(
              {
                title: inputData.title,
                content: inputData.content,
                writer: inputData.writer,
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries("GetNotices");
                  toast.success("공지가 등록되었습니다!");
                },
              }
            );
            setInputData({ title: "", content: "", writer: "" });
          } else {
            toast.error("빈 항목이 있습니다!");
          }
        }}
      >
        <p>작성하기</p>
      </FormButton>
    </FormBox>
  );
}
