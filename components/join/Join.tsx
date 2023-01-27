import React, { useState, useRef } from "react";
import { JoinUI } from "./JoinStyle";
import Image from "next/image";
import ImgLogo from "../../public/images/img_logo.png";
import { authJoin } from "../../api/firestore";
import Loading from "../loading/Loading";
import { useRouter } from "next/router";

interface ErrorType {
  name: string;
  code: string;
  message: string;
}

const Join = () => {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordChkRef = useRef<HTMLInputElement>(null);
  const joinInfoRef = useRef<HTMLElement>(null);
  const [isValidation, setValidation] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const validation = () => {
    const emailRegExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const nameVal = nameRef.current?.value;
    const emailVal = emailRef.current?.value;
    const passwordVal = passwordRef.current?.value;
    const passwordChkVal = passwordChkRef.current?.value;
    let infoText = "";

    if (nameVal && nameVal.length <= 2 && nameVal.length !== 0) {
      infoText = "이름을 2자 이상 입력해 주세요.";
    } else if (
      emailVal &&
      !emailVal.match(emailRegExp) &&
      emailVal.length !== 0
    ) {
      infoText = "이메일 형식을 맞춰 주세요.";
    } else if (
      passwordVal &&
      passwordVal.length <= 4 &&
      passwordVal.length !== 0
    ) {
      infoText = "패스워드를 4자 이상 입력해 주세요.";
    } else if (
      passwordChkVal &&
      passwordVal !== passwordChkVal &&
      passwordChkVal.length !== 0
    ) {
      infoText = "패스워드가 서로 다릅니다.";
    }

    if (joinInfoRef && joinInfoRef.current)
      joinInfoRef.current.innerHTML = infoText;
    if (
      nameVal &&
      emailVal &&
      passwordVal &&
      nameVal.length > 2 &&
      emailVal.match(emailRegExp) &&
      passwordVal.length > 4 &&
      passwordVal === passwordChkVal
    )
      setValidation(true);
  };

  const joinAction = async () => {
    setLoading(true);
    validation();
    if (isValidation) {
      try {
        const email: string =
          emailRef && emailRef.current ? emailRef.current.value : "";
        const password: string =
          passwordRef && passwordRef.current ? passwordRef.current?.value : "";
        await authJoin(email, password).then((data) => {
          console.log(data);
          alert("회원가입이 완료 되었습니다.\n로그인 페이지로 이동합니다.");
          router.push("/");
        });
      } catch (e) {
        console.log(e);
        const err = e as ErrorType;
        switch (err.code) {
          case "auth/email-already-in-use":
            alert("이미 가입된 이메일 주소 입니다.");
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
      <JoinUI>
        <Image
          src={ImgLogo}
          alt="LOGO"
          placeholder="blur"
          className="img-logo"
        />
        <p>JOIN</p>
        <p>
          <span>회원가입</span>
          <br />
          <em ref={joinInfoRef}></em>
        </p>
        <dl>
          <dt>이름</dt>
          <dd>
            <input
              type="text"
              placeholder="이름을 입력해 주세요."
              ref={nameRef}
              onKeyUp={() => validation()}
            />
          </dd>
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
          <dt>패스워드 확인</dt>
          <dd>
            <input
              type="password"
              placeholder="패스워드를 확인해 주세요."
              ref={passwordChkRef}
              onKeyUp={() => validation()}
            />
          </dd>
        </dl>
        <button
          type="button"
          onClick={() => joinAction()}
          disabled={!isValidation}
        >
          회원가입 완료
        </button>
        <p className="text-links">
          <a href="/">로그인</a>
        </p>
      </JoinUI>
    </>
  );
};
export default Join;
