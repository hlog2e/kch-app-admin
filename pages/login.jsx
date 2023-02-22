import styled from "styled-components";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { login } from "@/apis/auth";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
`;

const Card = styled.div`
  width: 400px;
  height: 500px;
  border-radius: 30px;
  background-color: white;
  padding: 30px;
`;

const Title = styled.h1`
  font-weight: 600;
  margin-top: 30px;
`;

const Input = styled.input`
  font-weight: 500;
  border: 0;
  outline: 0;
  background-color: #f4f4f4;
  width: 100%;
  height: 45px;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
`;

const InputWrap = styled.form`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export default function Login() {
  const router = useRouter();
  const { mutate } = useMutation(login);

  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [detectInputed, setDetectInputed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      router.push("/dashboard");
    }
  });

  useEffect(() => {
    if (idValue.length > 0 && pwValue.length > 0) {
      setDetectInputed(true);
    } else {
      setDetectInputed(false);
    }
  }, [idValue, pwValue]);

  const handleLogin = async () => {
    if (detectInputed) {
      mutate(
        { id: idValue, pw: pwValue },
        {
          onError: (_err) => {
            console.log(_err);
            toast.error(_err.response.data.message);
          },
          onSuccess: async (data) => {
            await localStorage.setItem("token", JSON.stringify(data.token));
            await localStorage.setItem("user", JSON.stringify(data.user));

            router.push("/dashboard");
          },
        }
      );
    }
  };

  return (
    <Container>
      <Card>
        <img alt={"금천고 로고"} width={50} height={50} src="/icon.png" />
        <Title>로그인</Title>

        <InputWrap onSubmit={handleLogin}>
          <Input
            type={"text"}
            placeholder={"아이디"}
            value={idValue}
            onChange={(e) => setIdValue(e.target.value)}
          />
          <Input
            type={"password"}
            placeholder={"비밀번호"}
            value={pwValue}
            onChange={(e) => setPwValue(e.target.value)}
          />
        </InputWrap>

        <Button
          height={"45px"}
          width={"100%"}
          color={detectInputed ? "black" : "gray"}
          text={"로그인"}
          onClick={handleLogin}
        />
      </Card>
    </Container>
  );
}
