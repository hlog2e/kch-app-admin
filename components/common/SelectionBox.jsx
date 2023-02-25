import styled from "styled-components";

const Wrap = styled.div`
  padding: 16px;
`;
const ButtonRow = styled.div`
  display: flex;
  width: fit-content;
  max-width: 100%;
  flex-direction: row;
  overflow: scroll;
  background-color: white;
  border-radius: 12px;
  height: 40px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 12px;
`;
const Button = styled.div`
  border-radius: 8px;
  height: 100%;
  background-color: ${(props) => {
    return props.active ? "#dbeafe" : "#f4f4f4";
  }};
  color: ${(props) => {
    return props.active ? "#60a5fa" : "gray";
  }};
  min-width: 70px;
  margin-left: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
`;

export default function SelectionBox({ array, selected, setSelected }) {
  return (
    <Wrap>
      <ButtonRow>
        {array.map((props) => {
          return (
            <Button
              key={Math.random()}
              onClick={() => {
                setSelected(props);
              }}
              active={JSON.stringify(selected) === JSON.stringify(props)}
            >
              <p>{props.value}</p>
            </Button>
          );
        })}
      </ButtonRow>
    </Wrap>
  );
}
