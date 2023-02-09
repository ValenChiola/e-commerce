import React, { useState } from "react";
import { Wrapper } from "../components/Wrapper";
import { useAuthContext } from "../context/AuthContext";

import "./login.css";

export const Login = () => {
  const [formValues, setFormValues] = useState({});
  const [isLogging, setIsLogging] = useState(false);
  const { signIn } = useAuthContext();

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setFormValues((old) => ({ ...old, [target.name]: target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLogging(true);
    signIn(formValues).finally(() => setIsLogging(false));
  };

  if (isLogging) return <Wrapper>Iniciando sesión...</Wrapper>;

  return (
    <form className="center" onSubmit={handleSubmit}>
      <h1>E-commerce</h1>
      <label htmlFor="email">
        Mail
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
        Contraseña
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          required
          onChange={handleInputChange}
        />
      </label>
      <button className="success" type="submit" disabled={!Object.keys(formValues).length}>
        Login
      </button>
    </form>
  );
};
