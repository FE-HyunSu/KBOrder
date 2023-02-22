import React, { useState, useEffect } from "react";
import Login from "../login/Login";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../store/store";

const Intro = () => {
  const router = useRouter();
  const storeUserInfo = useRecoilValue(userAtom);
  const [isLogin, setLogin] = useState(storeUserInfo.uid !== "");
  const loginCheck = () => {
    isLogin ? router.push("/list") : null;
  };
  useEffect(() => {
    setLogin(storeUserInfo.uid !== "");
    loginCheck();
  }, []);
  return <Login />;
};

export default Intro;
