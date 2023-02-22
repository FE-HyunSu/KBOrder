import React, { useState, useEffect } from "react";
import Login from "../login/Login";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../store/store";

const Intro = () => {
  const router = useRouter();
  const storeUserInfo = useRecoilValue(userAtom);
  const [isLogin, setLogin] = useState(storeUserInfo.uid !== "");
  useEffect(() => {
    setLogin(storeUserInfo.uid !== "");
    isLogin ? router.push("/list") : null;
  }, []);
  return <Login />;
};

export default Intro;
