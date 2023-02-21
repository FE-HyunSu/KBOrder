const apiAuth = (code: string, method: string) => {
  if (code === "inga" && method === "get") {
    const userYN = window.localStorage.getItem("userUid");
    return userYN !== null ? true : false;
  }
};

export { apiAuth };
