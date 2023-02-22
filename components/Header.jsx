import styled from "styled-components";

const HeaderRow = styled.div`
  padding-top: 12px;
  padding-bottom: 12px;
  display: flex;
  width: 100%;
  overflow: scroll;
`;

export default function Header({ data }) {
  return (
    <HeaderRow>
      {data.map(({ title, content }) => (
        <HeaderItem key={Math.random()} title={title} content={content} />
      ))}
    </HeaderRow>
  );
}

const HeaderItemBox = styled.div`
  margin-left: 12px;
  background-color: white;
  border-radius: 15px;
  height: 110px;
  width: 150px;
  min-width: 150px;
  padding: 14px;
`;
const HeaderItemTitle = styled.p`
  font-size: 14px;
  font-weight: 300;
`;
const HeaderItemContent = styled.p`
  margin-top: 10px;
  font-size: 36px;
  font-weight: 600;
`;
function HeaderItem({ title, content }) {
  return (
    <HeaderItemBox>
      <HeaderItemTitle>{title}</HeaderItemTitle>
      <HeaderItemContent>{content}</HeaderItemContent>
    </HeaderItemBox>
  );
}
