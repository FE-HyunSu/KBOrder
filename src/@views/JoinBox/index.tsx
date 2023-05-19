import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { authJoin, setData } from '@api/firestore';
import styled from '@emotion/styled';
import Loading from '@components/@common/Loading';
import { IMAGES } from '@constants/images';
import { LogoMotion, BounceMotion, TextMotion } from '@styles/keyframe';
import { validationName, validationEmail, validationPassword, validationMatch } from '@utils/validation';
import { ROUTES } from '@constants/routers';

interface ErrorType {
  name: string;
  code: string;
  message: string;
}

const JoinBox = () => {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordChkRef = useRef<HTMLInputElement>(null);
  const joinInfoRef = useRef<HTMLElement>(null);
  const [isValidation, setValidation] = useState<Boolean>(false);
  const [isLoading, setLoading] = useState<Boolean>(false);

  const validation = () => {
    const nameVal = nameRef.current?.value;
    const emailVal = emailRef.current?.value;
    const passwordVal = passwordRef.current?.value;
    const passwordChkVal = passwordChkRef.current?.value;
    let infoText = '';

    if (!validationName(nameVal)) {
      infoText = '이름을 2자 이상 입력해 주세요.';
    } else if (!validationEmail(emailVal)) {
      infoText = '이메일 형식을 맞춰 주세요.';
    } else if (!validationPassword(passwordVal)) {
      infoText = '패스워드를 6자 이상 입력해 주세요.';
    } else if (!validationMatch(passwordVal, passwordChkVal)) {
      infoText = '패스워드가 서로 다릅니다.';
    }

    if (joinInfoRef && joinInfoRef.current) joinInfoRef.current.innerHTML = infoText;
    if (
      validationName(nameVal) &&
      validationEmail(emailVal) &&
      validationPassword(passwordVal) &&
      validationMatch(passwordVal, passwordChkVal)
    )
      setValidation(true);
  };

  const addUser = async (uid: string, name: string, email: string) => {
    setLoading(true);
    await setData('user', { uid: uid, name: name, email: email });
  };

  const joinAction = async () => {
    setLoading(true);
    validation();
    if (isValidation) {
      try {
        const email: string = emailRef && emailRef.current ? emailRef.current.value : '';
        const password: string = passwordRef && passwordRef.current ? passwordRef.current?.value : '';
        const nameVal: string = nameRef && nameRef.current ? nameRef.current?.value : '';
        await authJoin(email, password).then((data) => {
          alert('회원가입이 완료 되었습니다.\n로그인 페이지로 이동합니다.');
          if (nameVal) addUser(data.user.uid, nameVal, email);
          router.push(ROUTES.INDEX, undefined, { shallow: true });
        });
      } catch (e) {
        console.log(e);
        const err = e as ErrorType;
        switch (err.code) {
          case 'auth/email-already-in-use':
            alert('이미 가입된 이메일 주소 입니다.');
            break;
          default:
            alert('오류가 발생 되었습니다. 다시 시도해 주세요.');
        }
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      alert('입력 정보를 확인해 주세요.');
    }
  };
  return (
    <>
      {isLoading ? <Loading /> : null}
      <JoinUI>
        <img src={IMAGES.LOGO} className="img-logo" alt="logo" />
        <p>JOIN</p>
        <p>
          <span>회원가입</span>
          <br />
          <em ref={joinInfoRef}></em>
        </p>
        <dl>
          <dt>이름</dt>
          <dd>
            <input type="text" placeholder="이름을 입력해 주세요." ref={nameRef} onKeyUp={() => validation()} />
          </dd>
          <dt>이메일</dt>
          <dd>
            <input type="text" placeholder="이메일을 입력해 주세요." ref={emailRef} onKeyUp={() => validation()} />
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
        <button type="button" onClick={() => joinAction()} disabled={!isValidation}>
          회원가입 완료
        </button>
        <p className="text-links">
          <a href={ROUTES.INDEX}>로그인</a>
        </p>
      </JoinUI>
    </>
  );
};
export default JoinBox;

export const JoinUI = styled.div`
  display: block;
  padding: 5rem 0 10rem;
  box-sizing: border-box;
  .img-logo {
    display: block;
    width: 8rem;
    height: 8rem;
    margin: auto;
    animation: ${LogoMotion} 1s forwards, ${BounceMotion} 7s 1s infinite;
  }
  p {
    padding-top: 1rem;
    font-weight: 500;
    font-size: 2.4rem;
    color: #1a1a1a;
    text-align: center;
    animation: ${TextMotion} 0.6s forwards;
    opacity: 0;
    & + p {
      padding-top: 0;
      padding-bottom: 1rem;
      animation: ${TextMotion} 0.6s 0.5s forwards;
    }
    span {
      font-weight: 300;
      font-size: 1.4rem;
      color: #3a3a3a;
    }
    em {
      display: inline-block;
      height: 1.2rem;
      font-weight: 500;
      font-size: 1.2rem;
      color: #ff3333;
      letter-spacing: -0.05rem;
    }
  }
  dl {
    dt {
      padding: 0.5rem 0;
      font-weight: 500;
      font-size: 1.2rem;
      color: #aaa;
      animation: ${TextMotion} 0.6s 0.7s both;
    }
    dd {
      padding-bottom: 0.2rem;
      animation: ${TextMotion} 0.6s 0.8s both;
    }
  }
  input {
    width: 30rem;
    padding: 1.5rem 1.2rem;
    border-radius: 0.4rem;
    box-sizing: border-box;
    border: 1px solid #ccc;
    outline: none;
    &:active,
    &:hover {
      border: 1px solid #ccc;
    }
  }
  button {
    display: block;
    min-width: 30rem;
    height: 5rem;
    margin: 0.8rem auto 0;
    padding: 0 1.3rem;
    border-radius: 0.5rem;
    background-color: #1a1a1a;
    font-weight: 500;
    font-size: 1.4rem;
    color: #fff;
    animation: ${TextMotion} 0.6s 1.2s both;
    transition: 0.2s;
    &:disabled {
      background-color: #bbb;
    }
    &:hover {
      font-size: 1.6rem;
      background-color: #000;
      &:disabled {
        font-size: 1.4rem;
        background-color: #bbb;
      }
    }
  }
  .text-links {
    padding: 0;
    text-align: right;
    a {
      display: inline-block;
      position: relative;
      padding: 0.8rem 0.2rem;
      font-weight: 500;
      font-size: 1.2rem;
      color: #3a3a3a;
      text-decoration: none;
      animation: ${TextMotion} 0.6s 1.5s both;
      & + a {
        margin-left: 0.8rem;
        &:before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: -0.5rem;
          width: 0.1rem;
          height: 0.8rem;
          margin: auto;
          border-right: 0.1rem solid #999;
        }
      }
    }
  }
`;
