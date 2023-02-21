import React, { useState, useEffect } from "react";
import Login from "../login/Login";
import { apiAuth } from "../../was/auth";
import { useRouter } from "next/router";

const Intro = () => {
  const router = useRouter();
  const [isInga, setInga] = useState(false);
  useEffect(() => {
    if (apiAuth("inga", "get")) router.push("list");
  }, [isInga]);
  return <Login />;
};

export default Intro;
