import { database } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseClientAuth } from "./firebaseConfig";

const authJoin = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(
    firebaseClientAuth,
    email,
    password
  );
};

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

export { authJoin, getData, setData, loginAuth, delData };
