import React, { useEffect } from "react";
import { useRouter } from "next/router";

const apiAuth = (code: string, method: string) => {
  if (code === "inga" && method === "get") {
    const userYN = window.localStorage.getItem("userUid");
    return userYN !== null ? true : false;
  }
};

export { apiAuth };
