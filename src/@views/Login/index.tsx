import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Loading from '@components/@common/Loading';
import styled from '@emotion/styled';
import { LogoMotion, BounceMotion, TextMotion } from '@styles/keyframe';
import { getData, loginAuth } from '@api/firestore';
import { useRecoilState } from 'recoil';
import { userAtom } from '@store/store';
import { IMAGES } from '@constants/images';
import { ROUTES } from '@constants/routers';
import Link from 'next/link';
import { COLOR } from '@styles/theme';

interface ErrorType {
  name: string;
  code: string;
  message: string;
}

interface UserListType {
  data(): any;
  id: string;
}

interface userInfoType {
  uid: string;
}

const Login = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const loginInfoRef = useRef<HTMLElement>(null);
  const [isValidation, setValidation] = useState<Boolean>(false);
  const [isLoading, setLoading] = useState<Boolean>(false);
  const [isUserInfo, setUserInfo] = useRecoilState(userAtom);

  const validation = () => {
    const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const emailVal = emailRef.current?.value;
    const passwordVal = passwordRef.current?.value;
    let infoText = '';
    if (emailVal && !emailVal.match(emailRegExp) && emailVal.length !== 0) {
      infoText = '이메일 형식을 맞춰 주세요.';
    } else if (passwordVal && passwordVal.length < 6 && passwordVal.length !== 0) {
      infoText = '패스워드는 6자 이상 입력해 주세요.';
    }

    if (loginInfoRef && loginInfoRef.current) loginInfoRef.current.innerHTML = infoText;
    if (emailVal && passwordVal && emailVal.match(emailRegExp) && passwordVal.length >= 6) setValidation(true);
  };

  const getUserInfo = async (key: string) => {
    setLoading(true);
    try {
      await getData('user').then((data) => {
        const userList = data.docs.map((item: UserListType) => {
          return { ...item.data(), id: item.id };
        });
        const userInfo = userList.filter((item: userInfoType) => item.uid === key);
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
  };

  const loginAction = async () => {
    setLoading(true);
    validation();
    if (isValidation) {
      try {
        const email: string = emailRef && emailRef.current ? emailRef.current.value : '';
        const password: string = passwordRef && passwordRef.current ? passwordRef.current?.value : '';
        await loginAuth(email, password).then((data) => {
          getUserInfo(data.user.uid);
          router.push(ROUTES.MAIN, undefined, { shallow: true });
        });
      } catch (e) {
        console.log(e);
        const err = e as ErrorType;
        switch (err.code) {
          case 'auth/user-not-found':
            alert('등록되지 않은 회원입니다.');
            break;
          case 'auth/wrong-password':
            alert('패스워드가 틀렸습니다.');
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
      <LoginUI>
        <img src={IMAGES.LOGO} alt="LOGO" className="img-logo" />
        <p>LOGIN</p>
        <p>
          <span>로그인</span>
          <br />
          <em ref={loginInfoRef}></em>
        </p>
        <dl>
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
        </dl>
        <button type="button" onClick={() => loginAction()}>
          로그인
        </button>
        <button type="button" onClick={() => router.push('main', undefined, { shallow: true })} className="btn-green">
          로그인 없이 구경하기
        </button>
        <p className="text-links">
          <Link href={ROUTES.JOIN}>회원가입</Link>
        </p>
      </LoginUI>
    </>
  );
};

export default Login;

export const LoginUI = styled.div`
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
    color: ${COLOR.black};
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
    padding: 1.2rem;
    font-size: 1.6rem;
    border-radius: 0.4rem;
    box-sizing: border-box;
    border: 1px solid ${COLOR.gray99};
    outline: none;
    &:active,
    &:hover {
      border: 1px solid ${COLOR.gray99};
    }
  }
  button {
    display: block;
    min-width: 30rem;
    height: 4.6rem;
    margin: 0.8rem auto 0;
    padding: 0 1.3rem;
    border-radius: 0.5rem;
    background-color: ${COLOR.black};
    font-weight: 500;
    font-size: 1.4rem;
    color: ${COLOR.white};
    animation: ${TextMotion} 0.6s 1.2s both;
    transition: 0.2s;
    &.btn-green {
      background-color: ${COLOR.green};
      &:hover {
        font-size: 1.6rem;
        background-color: ${COLOR.green};
      }
    }
    &:disabled {
      background-color: ${COLOR.grayCC};
    }
    &:hover {
      font-size: 1.6rem;
      background-color: ${COLOR.realBlack};
      &:disabled {
        font-size: 1.4rem;
        background-color: ${COLOR.grayCC};
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
          border-right: 0.1rem solid ${COLOR.gray99};
        }
      }
    }
  }
`;
