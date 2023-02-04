import { CSSProperties } from "react";
import { ProductDTO } from "../../types";

const pStyles: CSSProperties = {
  color: "gold",
  fontSize: "1.5em",
  margin: 0,
};

export const Rating = ({ rate, count }: ProductDTO["rating"]) => (
  <div className="flex-center">
    <p style={pStyles}>{"★".repeat(rate).padEnd(5, "✰")} </p>
    <p style={{ color: "black" }}>{count && `(${count})`}</p>
  </div>
);
