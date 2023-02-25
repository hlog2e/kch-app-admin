import styled from "styled-components";

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 10px;
  background-color: #60a5fa;
  height: 35px;
  padding: 14px;
  margin: 4px;
`;

export default function ButtonSM({ text, onClick }) {
  return <Button onClick={onClick}>{text}</Button>;
}
