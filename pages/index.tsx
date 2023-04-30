import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'src/store/store';
import Login from '@components/Login';
import { ROUTES } from '@constants/routers';

const Index = () => {
  const router = useRouter();
  const storeUserInfo = useRecoilValue(userAtom);
  const [isLogin, setLogin] = useState(storeUserInfo.uid !== '');
  useEffect(() => {
    setLogin(storeUserInfo.uid !== '');
    isLogin ? router.push(ROUTES.MAIN, undefined, { shallow: true }) : null;
  }, [storeUserInfo]);
  return <Login />;
};

export default Index;
