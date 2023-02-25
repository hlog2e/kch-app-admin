import styled from "styled-components";
import { IoAdd, IoRemove } from "react-icons/io5";
import { useState } from "react";
import { numRegexChecker } from "@/utils/regex";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
  backdrop-filter: blur(6px);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  box-shadow: 2px 2px 4px 2px #d9d9d9;
  background-color: white;
  border-radius: 20px;
  width: 250px;
  height: 300px;

  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const PickerRow = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CircleButton = styled.div`
  background-color: #e4e4e4;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Button = styled.div`
  background-color: ${(props) => props.color};
  height: 35px;
  width: 65px;
  border-radius: 10px;
  margin-left: 8px;
  cursor: pointer;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PickerInput = styled.input`
  font-size: 30px;
  font-weight: 500;
  width: 100px;
  border: 0;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

export default function AmountPicker({
  open,
  setOpen,
  amount,
  setAmount,
  onSubmit,
}) {
  if (open) {
    return (
      <ModalContainer>
        <Modal>
          <Title>수량 선택</Title>
          <PickerRow>
            <CircleButton
              onClick={() => {
                if (amount > 0) {
                  setAmount(amount - 1);
                }
              }}
            >
              <IoRemove size={"20px"} />
            </CircleButton>
            <PickerInput
              value={amount}
              onChange={(e) => {
                if (numRegexChecker(e.target.value)) {
                  setAmount(Number(e.target.value));
                }
              }}
            />
            <CircleButton
              onClick={() => {
                setAmount(amount + 1);
              }}
            >
              <IoAdd size={"20px"} />
            </CircleButton>
          </PickerRow>
          <ButtonRow>
            <Button
              color={"#d9d9d9"}
              onClick={() => {
                setOpen(false);
              }}
            >
              <p>취소</p>
            </Button>
            <Button color={"#60a5fa"} onClick={onSubmit}>
              <p>확인</p>
            </Button>
          </ButtonRow>
        </Modal>
      </ModalContainer>
    );
  }
}
