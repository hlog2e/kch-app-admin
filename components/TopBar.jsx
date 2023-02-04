import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: black;
  height: 60px;
`;

export default function TopBar() {
  return <Container></Container>;
}
