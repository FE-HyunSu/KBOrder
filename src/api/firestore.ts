import { database } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
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

const updateData = async (collectionName: string, id: string, data: object) => {
  await updateDoc(doc(database, collectionName, id), data);
};

const loginAuth = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(firebaseClientAuth, email, password);
};

const delData = async (collectionName: string, keyCode: string) => {
  return await deleteDoc(doc(database, collectionName, keyCode));
};

export { authJoin, getData, setData, updateData, loginAuth, delData };
