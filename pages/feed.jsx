import Layout from "@/components/Layout/Layout";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteFeed, getFeedItems, postFeedWithImage } from "@/apis/feed";
import moment from "moment";
import uuid from "react-uuid";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

import { IoFileTray, IoCloseCircle } from "react-icons/io5";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default function Feed() {
  return (
    <Layout>
      <Wrapper>
        <Form />
        <FeedItems />
      </Wrapper>
    </Layout>
  );
}

const FormBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  height: fit-content;
  padding: 16px;
  max-width: 400px;
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

const FormDropZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  border-radius: 10px;
  width: 100%;
  height: 200px;
  background-color: #f4f4f4;
  cursor: pointer;
`;
const DropZoneText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: gray;
`;
const FormImageWrap = styled.div`
  padding: 30px;
  border-radius: 15px;
  margin-top: 20px;
  background-color: #f4f4f4;
  .del_button {
    cursor: pointer;
    color: #fb7185;
    width: 29px;
    height: 29px;
    position: absolute;
  }
`;

const FormImage = styled.img`
  border-radius: 10px;
  margin-right: 15px;
  width: 100%;
  object-fit: contain;
`;

function Form() {
  const { mutate: postFeedMutate } = useMutation(postFeedWithImage);
  const queryClient = useQueryClient();

  const [files, setFiles] = useState([]);
  const [inputValues, setInputValues] = useState({
    publisher: "",
    content: "",
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [] },
    onDrop: (_files) => {
      _files.map((_file) =>
        setFiles((_prevState) => {
          return [
            ..._prevState,
            { id: uuid(), file: _file, url: URL.createObjectURL(_file) },
          ];
        })
      );
    },
  });

  const delImageHandler = (_delFileId) => {
    setFiles((_prevState) => {
      return _prevState.filter((_file) => _file.id !== _delFileId);
    });
  };

  const handlePOSTFeed = async () => {
    if (
      inputValues.publisher === "" ||
      inputValues.content === "" ||
      files.length < 1
    ) {
      return toast.error("빈 항목을 확인해주세요!");
    }

    const formData = new FormData();
    files.map((_file) => formData.append("image", _file.file));
    formData.append("publisher", inputValues.publisher);
    formData.append("content", inputValues.content);

    postFeedMutate(
      { formData: formData },
      {
        onSuccess: (res) => {
          setInputValues({
            publisher: "",
            content: "",
          });
          setFiles([]);
          toast.success(res.message);
          queryClient.invalidateQueries("FeedItems");
        },
      }
    );
  };

  return (
    <FormBox>
      <FormTitle>피드 업로드</FormTitle>
      <FormInput
        value={inputValues.publisher}
        onChange={(e) => {
          setInputValues((_prev) => {
            return { ..._prev, publisher: e.target.value };
          });
        }}
        placeholder={"부서 이름"}
      />
      <FormTextarea
        value={inputValues.content}
        onChange={(e) => {
          setInputValues((_prev) => {
            return { ..._prev, content: e.target.value };
          });
        }}
        placeholder={"내용"}
      />
      <FormDropZone {...getRootProps()}>
        <input {...getInputProps()} />
        <IoFileTray color={"gray"} size={28} />
        <DropZoneText>여기에 이미지를 끌어서 놓으세요 (또는 클릭)</DropZoneText>
      </FormDropZone>

      {files.length > 0 ? (
        <FormImageWrap>
          {/*<FormImageText>*/}
          {/*  (해당 이미지를 클릭하여 삭제 할 수 있습니다.)*/}
          {/*</FormImageText>*/}
          <Slider dots>
            {files.map((file) => (
              <div key={file.id}>
                <IoCloseCircle
                  className="del_button"
                  onClick={() => {
                    delImageHandler(file.id);
                  }}
                />
                <FormImage src={file.url} />
              </div>
            ))}
          </Slider>
        </FormImageWrap>
      ) : null}

      <FormButton onClick={handlePOSTFeed}>업로드</FormButton>
    </FormBox>
  );
}

const FeedCol = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
  @media (min-width: 768px) {
    margin-left: 30px;
  }
`;

function FeedItems() {
  const { data } = useQuery("FeedItems", getFeedItems);

  return (
    <FeedCol>
      {data
        ? data.feeds.map((_data) => (
            <FeedItem key={_data._id} feedData={_data} />
          ))
        : null}
    </FeedCol>
  );
}

const FeedBox = styled.div`
  margin-bottom: 4px;
  background-color: white;
  width: 100%;
`;
const FeedHeader = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 55px;
`;
const FeedDeleteBtn = styled.p`
  cursor: pointer;
  color: #fb7185;
  font-size: 12px;
  font-weight: 600;
`;

const FeedHeaderItem = styled.div`
  display: flex;
  align-items: center;
`;
const FeedHeaderTitle = styled.p`
  margin-left: 6px;
  font-weight: 600;
  font-size: 14px;
`;
const FeedImage = styled.img`
  width: 100%;
`;

const FeedFooter = styled.div`
  margin-top: 20px;
  padding: 10px;
`;
const FeedPublisher = styled.p`
  font-weight: 600;
  font-size: 13px;
`;
const FeedDesc = styled.p`
  margin-top: 4px;
  font-weight: 400;
  font-size: 12px;
`;
const FeedDatetime = styled.p`
  margin-top: 8px;
  font-size: 10px;
  color: gray;
  font-weight: 300;
`;

function FeedItem({ feedData }) {
  const { mutate: deleteFeedMutate } = useMutation(deleteFeed);
  const queryClient = useQueryClient();

  return (
    <FeedBox>
      <FeedHeader>
        <FeedHeaderItem>
          <img width={"30px"} height={"30px"} src={"/icon.png"} />
          <FeedHeaderTitle>{feedData.publisher}</FeedHeaderTitle>
        </FeedHeaderItem>
        <FeedHeaderItem>
          <FeedDeleteBtn
            onClick={() => {
              deleteFeedMutate(
                { feedId: feedData._id },
                {
                  onSuccess: (res) => {
                    toast.success(res.message);
                    queryClient.invalidateQueries("FeedItems");
                  },
                }
              );
            }}
          >
            삭제하기
          </FeedDeleteBtn>
        </FeedHeaderItem>
      </FeedHeader>
      <Slider dots>
        {feedData.images
          ? feedData.images.map((_url) => <FeedImage key={_url} src={_url} />)
          : null}
      </Slider>
      <FeedFooter>
        <FeedPublisher>{feedData.publisher}</FeedPublisher>
        <FeedDesc>{feedData.desc}</FeedDesc>
        <FeedDatetime>
          {moment(feedData.createdAt).format("YYYY년 MM월 DD일 hh시 mm분")}
        </FeedDatetime>
      </FeedFooter>
    </FeedBox>
  );
}
