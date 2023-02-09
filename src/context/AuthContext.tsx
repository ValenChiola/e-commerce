import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { firebaseAuth, FirebaseUser } from "../Services/Firebase";

// Create Context
const Context = createContext<AuthContextValues>({} as AuthContextValues);
Context.displayName = "AuthContext";

// Create Hook
export const useAuthContext = () => useContext(Context);

// Create HOC
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [me, setMe] = useState<AuthContextValues["me"]>(() => {
    const me = localStorage.getItem("me") ?? "null";
    return JSON.parse(me);
  });

  const signIn: AuthContextValues["signIn"] = async ({ email, password }) => {
    try {
      const auth = firebaseAuth();

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

  /** SignOut from firebase & clean all data session */
  const signOut: AuthContextValues["signOut"] = () =>
    firebaseSignOut(firebaseAuth()).then(clearLocalStorage);

  const clearLocalStorage = () => {
    setMe(null);
    localStorage.setItem("me", "null");
  };

  return (
    <Context.Provider value={{ me, signIn, signOut }}>
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
  signOut: () => void;
}

interface SignInProps {
  email?: string;
  password?: string;
}
