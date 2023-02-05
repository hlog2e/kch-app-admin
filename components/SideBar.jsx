import styled from "styled-components";
import { RxDashboard } from "react-icons/rx";
import { IoPeopleOutline } from "react-icons/io5";
import { useRouter } from "next/router";

const Container = styled.div`
  position: relative;
  top: 60px;
  height: calc(100vh - 60px);
  width: 200px;
  max-width: 200px;
`;

export default function SideBar() {
  const router = useRouter();

  const sideBarItems = [
    {
      id: 0,
      text: "대시보드",
      icon: <RxDashboard />,
      isChecked: router.pathname === "/dashboard",
    },
    {
      id: 1,
      text: "학생관리",
      icon: <IoPeopleOutline />,
      isChecked: router.pathname === "/student",
    },
  ];
  return (
    <Container>
      {sideBarItems.map(({ id, text, icon, isChecked }) => {
        return (
          <SideBarItem key={id} text={text} icon={icon} isChecked={isChecked} />
        );
      })}
    </Container>
  );
}

const Item = styled.div`
  height: 45px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 15px;

  &:hover {
    background-color: #f4f4f4;
  }
`;
const ItemText = styled.p`
  font-weight: 500;
  font-size: 14px;
  margin-left: 8px;
  color: ${(props) => {
    return props.isChecked ? "black" : "gray";
  }};
`;

function SideBarItem({ text, icon, isChecked }) {
  return (
    <Item>
      {icon}
      <ItemText isChecked={isChecked}>{text}</ItemText>
    </Item>
  );
}
