import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, User } from "firebase/auth";
import { App } from "../AppConfig";

export const firebaseApp = initializeApp(App.firebaseConfig);

export const firebaseAuth = getAuth;

export type FirebaseUser = User;

export const googleProvider = new GoogleAuthProvider();

export const createUser = ({ email, password }: UserCreate) =>
  createUserWithEmailAndPassword(firebaseAuth(), email, password).then(
    ({ user }) => user
  );

export interface UserCreate {
  email: string;
  password: string;
}
