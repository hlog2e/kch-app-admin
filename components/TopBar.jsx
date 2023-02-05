import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: #f2f2f2;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoTitleArea = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const Title = styled.p`
  font-weight: 600;
  margin-left: 10px;
  font-size: 15px;
`;

export default function TopBar() {
  const router = useRouter();
  return (
    <Container>
      <LogoTitleArea
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        <Image alt={"금천고 로고"} src={"/icon.png"} width={30} height={30} />
        <Title>금천고등학교 앱 관리 시스템</Title>
      </LogoTitleArea>
    </Container>
  );
}
