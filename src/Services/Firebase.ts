import { App } from "../AppConfig";
import { initializeApp } from "firebase/app";
import { getAuth, User, createUserWithEmailAndPassword , GoogleAuthProvider} from "firebase/auth";

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
