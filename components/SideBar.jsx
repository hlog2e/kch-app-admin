import styled from "styled-components";

const Container = styled.div`
  position: relative;
  top: 60px;
  height: calc(100vh - 60px);
  width: 260px;
  max-width: 260px;

  background-color: red;
`;

export default function SideBar() {
  return (
    <Container>
      <p>ddddddddd테스트입니다ㅡㅏㅏㅏㅏㅏ테스트</p>
    </Container>
  );
}
