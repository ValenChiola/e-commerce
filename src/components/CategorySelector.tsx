import React from "react";
import { capitalize } from "../helpers/capitalize";
import INFOMARTION from "../information";
import { Category } from "./Product/api/products";

const categories = Object.values(Category);

const { all } = INFOMARTION;

export const CategorySelector = ({ state: [category, setCategory] }: Props) => (
  <select defaultValue={category ?? all}>
    <option onClick={() => setCategory(undefined)}>{all}</option>
    {categories.map((item) => (
      <option key={item} onClick={() => setCategory(item)}>
        {capitalize(item)}
      </option>
    ))}
  </select>
);

interface Props {
  state: [
    Category | undefined,
    React.Dispatch<React.SetStateAction<Category | undefined>>
  ];
}
