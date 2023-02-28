import Layout from "@/components/Layout/Layout";
import styled from "styled-components";
import Header from "@/components/common/Header";
import SelectionBox from "@/components/common/SelectionBox";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createRegisterCode,
  deleteUnUsedRegisterCode,
  getRegisterCodeInfo,
  getRegisterCodes,
} from "@/apis/registerCode";
import moment from "moment/moment";
import { toast } from "react-toastify";
import ButtonSM from "@/components/register-code/ButtonSM";
import AmountPicker from "@/components/register-code/AmountPicker";
import { CSVLink } from "react-csv";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonRow = styled.div`
  display: flex;
  margin-left: 12px;
`;
export default function RegisterCode() {
  const [type, setType] = useState({ isUsed: false, value: "미사용" });

  const queryClient = useQueryClient();
  const { data: info } = useQuery("RegisterCodeInfo", getRegisterCodeInfo);
  const { data: registerCodes } = useQuery(["RegisterCodes", type], () => {
    return getRegisterCodes(type.isUsed);
  });

  const { mutate: createRegisterCodeMutate } = useMutation(createRegisterCode);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const [isExcel, setIsExcel] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const csvDownloaderRef = useRef();

  useEffect(() => {
    if (csvData.length > 0) {
      csvDownloaderRef.current.link.click();
    }
  }, [csvData]);

  return (
    <>
      <Layout>
        <Wrapper>
          <Header
            data={[
              {
                title: "미사용 가입코드",
                content: info ? info.unUsed + "개" : "null",
              },
              {
                title: "사용한 가입코드",
                content: info ? info.used + "개" : "null",
              },
              {
                title: "전체 가입코드",
                content: info ? info.all + "개" : "null",
              },
            ]}
          />
          <SelectionBox
            selected={type}
            setSelected={setType}
            array={[
              { isUsed: false, value: "미사용" },
              { isUsed: true, value: "사용함" },
            ]}
          />
          <ButtonRow>
            <ButtonSM
              text="가입코드 생성"
              onClick={() => {
                setIsExcel(false);
                setPickerOpen(true);
              }}
            />
            <ButtonSM
              text="가입코드 생성 (액셀)"
              onClick={() => {
                setIsExcel(true);
                setPickerOpen(true);
              }}
            />
          </ButtonRow>
          <AmountPicker
            open={pickerOpen}
            setOpen={setPickerOpen}
            amount={amount}
            setAmount={setAmount}
            onSubmit={() => {
              createRegisterCodeMutate(
                { amount: amount },
                {
                  onSuccess: (_data) => {
                    toast.success(`가입코드 ${amount}개가 생성되었습니다.`);
                    queryClient.invalidateQueries("RegisterCodeInfo");
                    queryClient.invalidateQueries("RegisterCodes");

                    if (isExcel) {
                      setCsvData(
                        _data.codes.map(({ _id }) => {
                          return { 가입코드: _id };
                        })
                      );
                      setIsExcel(false);
                    }
                  },
                }
              );

              setPickerOpen(false);
              setAmount(0);
            }}
          />

          <CSVLink
            data={csvData}
            filename={"금천고 앱 가입코드"}
            ref={csvDownloaderRef}
          />

          {registerCodes ? (
            <RegisterCodeRow>
              {registerCodes.map((props) => {
                return <RegisterCodeItem key={props._id} codeData={props} />;
              })}
            </RegisterCodeRow>
          ) : null}
        </Wrapper>
      </Layout>
    </>
  );
}

const RegisterCodeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px;
`;

const RegisterCard = styled.div`
  background-color: white;
  width: 230px;
  border-radius: 15px;
  padding: 14px;
  margin-right: 12px;
  margin-top: 12px;
`;

const RegisterTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
`;
const RegisterDesc = styled.p`
  margin-top: 6px;
  font-size: 13px;
  font-weight: 300;
`;
const CardButton = styled.div`
  margin-top: 12px;
  height: 35px;
  width: 100%;
  background-color: #f87171;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

function RegisterCodeItem({ codeData }) {
  const { mutate: deleteRegisterCodeMutate } = useMutation(
    deleteUnUsedRegisterCode
  );
  const queryClient = useQueryClient();

  return (
    <RegisterCard>
      <RegisterTitle>{codeData._id}</RegisterTitle>
      <RegisterDesc>
        사용여부 : {codeData.isUsed ? "사용함" : "미사용"}
      </RegisterDesc>
      <RegisterDesc>
        사용한 유저 ID : {codeData.usedUser ? codeData.usedUser._id : "미사용"}
      </RegisterDesc>
      <RegisterDesc>
        사용한 유저 이름 :{" "}
        {codeData.usedUser ? codeData.usedUser.name : "미사용"}
      </RegisterDesc>
      <RegisterDesc>
        사용일시 :{" "}
        {codeData.isUsed
          ? moment(codeData.updatedAt).format("YYYY-MM-DD hh:mm:ss A")
          : "미사용"}
      </RegisterDesc>
      <RegisterDesc>
        생성일시 : {moment(codeData.createdAt).format("YYYY-MM-DD hh:mm:ss A")}
      </RegisterDesc>
      <RegisterDesc>발급자 : {codeData.issuer}</RegisterDesc>
      {!codeData.isUsed ? (
        <CardButton
          onClick={() => {
            deleteRegisterCodeMutate(
              { code: codeData._id },
              {
                onSuccess: (res) => {
                  toast.success(res.message);
                  queryClient.invalidateQueries("RegisterCodeInfo");
                  queryClient.invalidateQueries("RegisterCodes");
                },
                onError: (err) => {
                  console.log(err);
                  toast.error("가입코드 삭제 중 오류가 발생하였습니다.");
                },
              }
            );
          }}
        >
          <p>삭제하기</p>
        </CardButton>
      ) : null}
    </RegisterCard>
  );
}
