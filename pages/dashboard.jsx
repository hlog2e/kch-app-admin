import Layout from "@/components/Layout/Layout";
import Header from "@/components/common/Header";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getCountOfAllUsers } from "@/apis/user";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;
export default function Dashboard() {
  const { data: count } = useQuery("allCount", getCountOfAllUsers);

  return (
    <Layout>
      <Wrap>
        {count ? (
          <Header
            data={[
              { title: "전체 가입자 수", content: count.all + "명" },
              { title: "1학년 가입자 수", content: count.grade1 + "명" },
              { title: "2학년 가입자 수", content: count.grade2 + "명" },
              { title: "3학년 가입자 수", content: count.grade3 + "명" },
              { title: "선생님 가입자 수", content: count.teacher + "명" },
            ]}
          />
        ) : null}
      </Wrap>
    </Layout>
  );
}
