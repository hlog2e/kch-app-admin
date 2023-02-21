import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
`;

const ChildWrap = styled.div`
  flex: 1;
  position: relative;
  top: 60px;
  height: calc(100vh - 60px);
  overflow: scroll;
  background-color: #f4f4f4;
`;

export default function Layout({ children }) {
  return (
    <Wrap>
      <TopBar />
      <SideBar />
      <ChildWrap> {children}</ChildWrap>
    </Wrap>
  );
}
