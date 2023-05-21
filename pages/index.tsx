import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'src/store/store';
import Login from '@components/Login';
import { ROUTES } from '@constants/routers';
import Loading from '@components/@common/Loading';

const Index = () => {
  const router = useRouter();
  const storeUserInfo = useRecoilValue(userAtom);
  const [isLogin, setLogin] = useState(storeUserInfo.uid !== '');
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLogin(storeUserInfo.uid !== '');
    isLogin ? router.push(ROUTES.MAIN, undefined, { shallow: true }) : null;
    setLoading(false);
  }, [storeUserInfo]);
  return <>{isLoading ? <Loading /> : <Login />}</>;
};

export default Index;
