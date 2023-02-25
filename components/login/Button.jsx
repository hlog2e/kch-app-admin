import styled from "styled-components";

const BottomButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: ${(_props) => _props.width};
  height: ${(_props) => _props.height};
  background-color: ${(_props) => _props.color};
  cursor: pointer;
`;

const ButtonText = styled.p`
  font-weight: 600;
  color: white;
`;

export default function Button({ width, height, color, onClick, text }) {
  return (
    <BottomButton width={width} height={height} color={color} onClick={onClick}>
      <ButtonText>{text}</ButtonText>
    </BottomButton>
  );
}
