import { atom } from "recoil";

export const headerTitle = atom({
  key: "headerTitle",
  default: "Header",
});

export const userAtom = atom({
  key: "userAtom",
  default: {
    uid: "",
    name: "",
  },
});
