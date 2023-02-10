import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import {
  firebaseAuth,
  FirebaseUser,
  googleProvider,
} from "../Services/Firebase";

// Create Context
const Context = createContext<AuthContextValues>({} as AuthContextValues);
Context.displayName = "AuthContext";

// Create Hook
export const useAuthContext = () => useContext(Context);

const auth = firebaseAuth()

// Create HOC
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [me, setMe] = useState<AuthContextValues["me"]>(() => {
    const me = localStorage.getItem("me") ?? "null";
    return JSON.parse(me);
  });

  const signIn: AuthContextValues["signIn"] = async ({ email, password }) => {
    try {

      if (!email || !password)
        return Promise.reject("Revise el usuario y contraseña");

      const { user } = await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("me", JSON.stringify(user));

      setMe(user);

      return user;
    } catch (error) {
      return Promise.reject("Revise el usuario y contraseña.");
    }
  };

  const signInWithGoogle: AuthContextValues["signInWithGoogle"] = () =>
    signInWithPopup(auth, googleProvider).then(({ user }) =>
      setMe(user)
    );

  /** SignOut from firebase & clean all data session */
  const signOut: AuthContextValues["signOut"] = () =>
    firebaseSignOut(auth).then(clearLocalStorage);

  const clearLocalStorage = () => {
    setMe(null);
    localStorage.setItem("me", "null");
  };

  return (
    <Context.Provider value={{ me, signIn, signInWithGoogle, signOut }}>
      {children}
    </Context.Provider>
  );
};

// Interfaces
interface AuthContextValues {
  me: FirebaseUser | null;
  signIn: ({
    email,
    password,
  }: SignInProps) => Promise<AuthContextValues["me"]>;
  signInWithGoogle: () => void;
  signOut: () => void;
}

interface SignInProps {
  email?: string;
  password?: string;
}
