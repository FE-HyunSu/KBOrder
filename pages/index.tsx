import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LogoMotion, BounceMotion, TextMotion } from "src/styles/keyframe";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userAtom } from "src/store/store";
import Login from "@components/Login";

const Index = () => {
  const router = useRouter();
  const storeUserInfo = useRecoilValue(userAtom);
  const [isLogin, setLogin] = useState(storeUserInfo.uid !== "");
  useEffect(() => {
    setLogin(storeUserInfo.uid !== "");
    isLogin ? router.push("/main") : null;
  }, []);
  return <Login />;
};

export default Index;
