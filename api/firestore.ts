import { database } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseClientAuth } from "./firebaseConfig";

const getData = async (collectionName: string) => {
  return await getDocs(collection(database, collectionName));
};

const setData = async (collectionName: string, data: object) => {
  return await addDoc(collection(database, collectionName), data);
};
const loginAuth = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(firebaseClientAuth, email, password);
};

const delData = async (collectionName: string, keyCode: string) => {
  return await deleteDoc(doc(database, collectionName, keyCode));
};

export { getData, setData, loginAuth, delData };
