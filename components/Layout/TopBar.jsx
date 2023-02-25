import styled from "styled-components";
import { useRouter } from "next/router";
import { IoMenu, IoClose } from "react-icons/io5";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: #f2f2f2;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderLeft = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
`;

const LogoTitleArea = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Title = styled.p`
  font-weight: 600;
  margin-left: 10px;
  font-size: 15px;
`;
const TabBarToggle = styled.div`
  padding-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IconButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default function TopBar({ isMobile, sideBarShow, handleToggle }) {
  const router = useRouter();
  return (
    <Container>
      <HeaderLeft>
        {isMobile ? (
          <TabBarToggle>
            {!sideBarShow ? (
              <IconButton
                onClick={() => {
                  handleToggle();
                }}
              >
                <IoMenu size={"26px"} />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  handleToggle();
                }}
              >
                <IoClose size={"28px"} />
              </IconButton>
            )}
          </TabBarToggle>
        ) : null}
        <LogoTitleArea
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          <img alt={"금천고 로고"} src={"/icon.png"} width={30} height={30} />
          <Title>금천고등학교 앱 관리 시스템</Title>
        </LogoTitleArea>
      </HeaderLeft>
    </Container>
  );
}
