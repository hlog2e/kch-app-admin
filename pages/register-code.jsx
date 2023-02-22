import Layout from "@/components/Layout";
import styled from "styled-components";
import Header from "@/components/Header";
import SelectionBox from "@/components/SelectionBox";
import { useState } from "react";
import { useQuery } from "react-query";
import { getRegisterCodeInfo, getRegisterCodes } from "@/apis/registerCode";
import moment from "moment/moment";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export default function RegisterCode() {
  const [type, setType] = useState({ isUsed: false, value: "미사용" });

  const { data: info } = useQuery("RegisterCodeInfo", getRegisterCodeInfo);
  const { data: registerCodes } = useQuery(["RegisterCodes", type], () => {
    return getRegisterCodes(type.isUsed);
  });

  return (
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
        {registerCodes ? (
          <RegisterCodeRow>
            {registerCodes.map((props) => {
              return <RegisterCodeItem key={props._id} codeData={props} />;
            })}
          </RegisterCodeRow>
        ) : null}
      </Wrapper>
    </Layout>
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

function RegisterCodeItem({ codeData }) {
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
          ? moment(codeData.updatedAt).format("YYYY-MM-DD hh:mm:ss")
          : "미사용"}
      </RegisterDesc>
      <RegisterDesc>
        생성일시 : {moment(codeData.createdAt).format("YYYY-MM-DD hh:mm:ss")}
      </RegisterDesc>
      <RegisterDesc>발급자 : {codeData.issuer}</RegisterDesc>
    </RegisterCard>
  );
}
