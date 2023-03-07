import Layout from "@/components/Layout/Layout";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import { getFeedItems } from "@/apis/feed";
import moment from "moment";

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

function Form() {
  return <FormBox></FormBox>;
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
    margin-left: 20px;
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
  height: 55px;
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
  return (
    <FeedBox>
      <FeedHeader>
        <img width={"30px"} height={"30px"} src={"/icon.png"} />
        <FeedHeaderTitle>{feedData.publisher}</FeedHeaderTitle>
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
