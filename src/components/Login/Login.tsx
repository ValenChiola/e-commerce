import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useUIContext } from "../../context/UIContext";
import { createUser, UserCreate } from "../../Services/Firebase";
import { Wrapper } from "../Wrapper";

import "./login.css";

export const Login = () => {
  const [formValues, setFormValues] = useState({});
  const [isLoging, setIsLoging] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const { signIn, signInWithGoogle } = useAuthContext();
  const { showError } = useUIContext();

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setFormValues((old) => ({ ...old, [target.name]: target.value }));

  const handleSignIn = (data: Record<string, string>) => {
    setIsLoging(true);
    signIn(data)
      .catch(showError)
      .finally(() => setIsLoging(false));
  };

  const handleCreateUser = () => {
    setIsCreatingUser(true);
    createUser(formValues as UserCreate)
      .then(() => handleSignIn(formValues))
      .catch(showError)
      .finally(() => setIsCreatingUser(false));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignIn(formValues);
  };

  if (isCreatingUser) return <Wrapper>Creando usuario...</Wrapper>;

  if (isLoging) return <Wrapper>Iniciando sesión...</Wrapper>;

  return (
    <form className="center" onSubmit={handleSubmit} autoComplete="off">
      <h1>E-commerce</h1>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          required
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          required
          onChange={handleInputChange}
        />
      </label>
      <div className="flex-center" style={{ marginTop: 20 }}>
        <button
          type="submit"
          className="success"
          disabled={!Object.keys(formValues).length}
        >
          Sign In
        </button>
        <button
          type="button"
          className="success"
          disabled={!Object.keys(formValues).length}
          onClick={handleCreateUser}
        >
          Create Account
        </button>
      </div>
      <hr />
      <button type="button" className="danger flex-center" onClick={signInWithGoogle}>
        <img
          style={{ borderRadius: '50%' }}
          src="https://cdn-teams-slug.flaticon.com/google.jpg"
          width={20}
          height={20}
          alt="google"
        />
        Sign in With Google
      </button>
    </form>
  );
};
