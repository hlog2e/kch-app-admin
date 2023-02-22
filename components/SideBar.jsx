import styled from "styled-components";
import { RxDashboard } from "react-icons/rx";
import { IoPeopleOutline, IoKeyOutline } from "react-icons/io5";
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
      route: "/dashboard",
      isChecked: router.pathname === "/dashboard",
      router: router,
    },
    {
      id: 1,
      text: "학생관리",
      icon: <IoPeopleOutline />,
      route: "/student",
      isChecked: router.pathname === "/student",
      router: router,
    },
    {
      id: 2,
      text: "가입코드",
      icon: <IoKeyOutline />,
      route: "/register-code",
      isChecked: router.pathname === "/register-code",
      router: router,
    },
  ];
  return (
    <Container>
      {sideBarItems.map(({ id, text, icon, isChecked, route, router }) => {
        return (
          <SideBarItem
            key={id}
            text={text}
            icon={icon}
            isChecked={isChecked}
            route={route}
            router={router}
          />
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
  cursor: pointer;

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

function SideBarItem({ text, icon, isChecked, route, router }) {
  return (
    <Item
      onClick={() => {
        router.push(route);
      }}
    >
      {icon}
      <ItemText isChecked={isChecked}>{text}</ItemText>
    </Item>
  );
}
