import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";
import styled from "styled-components";
import { useEffect, useState } from "react";

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
  const [width, setWidth] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sideBarShow, setSideBarShow] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (width < 768) {
      setSideBarShow(false);
      setIsMobile(true);
    } else {
      setSideBarShow(true);
      setIsMobile(false);
    }
  }, [width]);

  const handleTabBarToggle = () => {
    setSideBarShow(!sideBarShow);
  };

  return (
    <Wrap>
      <TopBar
        sideBarShow={sideBarShow}
        isMobile={isMobile}
        handleToggle={handleTabBarToggle}
      />
      {sideBarShow ? <SideBar /> : null}

      <ChildWrap> {children}</ChildWrap>
    </Wrap>
  );
}
