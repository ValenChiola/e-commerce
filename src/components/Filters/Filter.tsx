import React, { CSSProperties } from "react";

const divStyles: CSSProperties = {
  border: "1px solid black",
  padding: "1em",
  textAlign: "start",
};

export const Filter = ({ title, children }: Props) => (
  <div style={divStyles}>
    <h2>{title}</h2>
    <hr />
    {children}
  </div>
);

interface Props {
  title: string;
  children: React.ReactNode;
}
