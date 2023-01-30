import React, { useEffect } from "react";
import Login from "../login/Login";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../store/store";

const Intro = () => {
  const userInfo = useRecoilValue(userAtom);
  useEffect(() => {
    console.log("userInfo", userInfo);
  }, []);
  return (
    <>
      <Login />
    </>
  );
};
export default Intro;
