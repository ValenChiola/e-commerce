import { App } from "../AppConfig";
import { initializeApp } from "firebase/app";
import { getAuth, User } from "firebase/auth";

export const firebaseApp = initializeApp(App.firebaseConfig);

export const firebaseAuth = getAuth;

export type FirebaseUser = User;
