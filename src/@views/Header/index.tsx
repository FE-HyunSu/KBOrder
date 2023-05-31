import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { IMAGES } from '@constants/images';
import { userAtom } from '@store/store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { ROUTES } from '@constants/routers';
import { COLOR } from '@styles/theme';

interface userDataType {
  uid: string;
  name: string;
  email: string;
}

const Header = () => {
  const [isAtomUserInfo, setAtomUserInfo] = useRecoilState(userAtom);
  const storeUserInfo = useRecoilValue(userAtom);
  const [isUserData, setUserData] = useState<userDataType>();
  const [isBtnBackDisplay, setBtnBackDisplay] = useState<boolean>(false);
  const router = useRouter();
  const logout = () => {
    window.localStorage.removeItem('userUid');
    setAtomUserInfo({
      uid: '',
      name: '',
      email: '',
    });
    router.push(ROUTES.INDEX, undefined, { shallow: true });
  };

  const historyBack = () => {
    router.push(ROUTES.LIST, undefined, { shallow: true });
  };

  useEffect(() => {
    router.pathname === '/list/[id]' ? setBtnBackDisplay(false) : setBtnBackDisplay(true);
  }, [router]);
  useEffect(() => {
    setUserData(storeUserInfo);
  }, [storeUserInfo]);

  return (
    <HeaderUI>
      <h1>
        {isBtnBackDisplay ? (
          <Link href={ROUTES.INDEX}>
            <img src={IMAGES.LOGO} className="img-logo" alt="logo" />
            KBOrder
          </Link>
        ) : (
          <BtnPrev type="button" onClick={() => historyBack()}>
            뒤로
          </BtnPrev>
        )}
      </h1>
      <p>
        {isUserData && isUserData.uid !== '' ? (
          <>
            <em>{isUserData.name}</em>님
            <button type="button" onClick={() => logout()}>
              로그아웃
            </button>
          </>
        ) : router.pathname !== ROUTES.INDEX ? (
          <button type="button" onClick={() => router.push(ROUTES.INDEX, undefined, { shallow: true })}>
            로그인
          </button>
        ) : null}
      </p>
    </HeaderUI>
  );
};

export default Header;

const HeaderUI = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  padding: 0 1.4rem;
  background-color: ${COLOR.white};
  border: 0.1rem solid ${COLOR.grayEE};
  box-sizing: border-box;
  z-index: 10;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.4rem;
    color: ${COLOR.black};
    img {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      margin-right: 0.5rem;
    }
    span {
      font-weight: 300;
      color: #aaa;
    }
  }
  p {
    display: flex;
    flex: 1 auto;
    justify-content: flex-end;
    align-items: center;
    font-size: 1.3rem;
    em {
      display: inline-block;
      padding: 0 0.3rem;
      color: ${COLOR.green};
    }
    button {
      display: inline-block;
      margin-left: 0.8rem;
      padding: 0.5rem;
      font-size: 1.2rem;
      color: ${COLOR.white};
      background-color: #3a3a3a;
      border-radius: 0.4rem;
    }
  }
  & + main {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    min-height: calc(100vh - 10rem);
    padding-top: 5rem;
    overflow: hidden;
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      min-height: calc(100vh - 10rem);
    }
  }
`;

const BtnPrev = styled.button`
  position: relative;
  width: 5rem;
  height: 3rem;
  padding-left: 1rem;
  font-size: 1.4rem;
  background-color: transparent;
  line-height: 1;
  color: ${COLOR.black};
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0.5rem;
    width: 0.8rem;
    height: 0.8rem;
    margin: auto;
    border-bottom: 0.1rem solid ${COLOR.black};
    border-left: 0.1rem solid ${COLOR.black};
    transform: rotate(45deg);
  }
`;
