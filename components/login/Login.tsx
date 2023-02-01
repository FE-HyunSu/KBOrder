import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Loading from "../loading/Loading";
import { LoginUI } from "./LoginStyle";
import { getData, loginAuth } from "../../api/firestore";
import { useRecoilState, selector } from "recoil";
import { userAtom } from "../../store/store";
import ImgLogo from "../../public/images/img_logo.png";

interface ErrorType {
  name: string;
  code: string;
  message: string;
}

const Login = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const loginInfoRef = useRef<HTMLElement>(null);
  const [isValidation, setValidation] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isUserInfo, setUserInfo] = useRecoilState(userAtom);

  const validation = () => {
    const emailRegExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const emailVal = emailRef.current?.value;
    const passwordVal = passwordRef.current?.value;
    let infoText = "";
    if (emailVal && !emailVal.match(emailRegExp) && emailVal.length !== 0) {
      infoText = "이메일 형식을 맞춰 주세요.";
    } else if (
      passwordVal &&
      passwordVal.length < 6 &&
      passwordVal.length !== 0
    ) {
      infoText = "패스워드는 6자 이상 입력해 주세요.";
    }

    if (loginInfoRef && loginInfoRef.current)
      loginInfoRef.current.innerHTML = infoText;
    if (
      emailVal &&
      passwordVal &&
      emailVal.match(emailRegExp) &&
      passwordVal.length >= 6
    )
      setValidation(true);
  };

  const getUserInfo = async (key: string) => {
    setLoading(true);
    try {
      await getData("user").then((data) => {
        const userList = data.docs.map((item: any) => {
          return { ...item.data(), id: item.id };
        });
        const userInfo = userList.filter((item: any) => item.uid === key);
        setUserInfo({
          uid: userInfo[0].uid,
          name: userInfo[0].name,
          email: userInfo[0].email,
        });
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    console.log(key);
  };

  const loginAction = async () => {
    setLoading(true);
    validation();
    if (isValidation) {
      try {
        const email: string =
          emailRef && emailRef.current ? emailRef.current.value : "";
        const password: string =
          passwordRef && passwordRef.current ? passwordRef.current?.value : "";
        await loginAuth(email, password).then((data) => {
          console.log(data);
          getUserInfo(data.user.uid);
          window.localStorage.setItem("userUid", data.user.uid);
          router.push("/list");
        });
      } catch (e) {
        console.log(e);
        const err = e as ErrorType;
        switch (err.code) {
          case "auth/user-not-found":
            alert("등록되지 않은 회원입니다.");
            break;
          default:
            alert("오류가 발생 되었습니다. 다시 시도해 주세요.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      alert("입력 정보를 확인해 주세요.");
    }
  };

  return (
    <>
      {isLoading && isLoading ? <Loading /> : null}
      <LoginUI>
        <Image
          src={ImgLogo}
          alt="LOGO"
          placeholder="blur"
          className="img-logo"
        />
        <p>LOGIN</p>
        <p>
          <span>로그인</span>
          <br />
          <em ref={loginInfoRef}></em>
        </p>
        <dl>
          <dt>이메일</dt>
          <dd>
            <input
              type="text"
              placeholder="이메일을 입력해 주세요."
              ref={emailRef}
              onKeyUp={() => validation()}
            />
          </dd>
          <dt>패스워드</dt>
          <dd>
            <input
              type="password"
              placeholder="패스워드를 입력해 주세요."
              ref={passwordRef}
              onKeyUp={() => validation()}
            />
          </dd>
        </dl>
        <button type="button" onClick={() => loginAction()}>
          로그인
        </button>
        <p className="text-links">
          <a href="/list">비회원 로그인</a>
          <a href="/join">회원가입</a>
        </p>
      </LoginUI>
    </>
  );
};

export const getServerSideProps = async () => {
  console.log("SSR");
  console.log(window.localStorage.getItem("userUid"));
};

export default Login;
