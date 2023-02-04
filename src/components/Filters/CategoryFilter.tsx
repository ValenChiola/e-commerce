import React, { useState } from "react";
import { capitalize } from "../../helpers/capitalize";
import { Category, FilterProps } from "../../types";
import { Filter } from "./Filter";

const categories = Object.values(Category);

export const CategoryFilter = ({ onChange }: FilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
    () => new Set()
  );

  const handleOnChange = ({
    target: { name, checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const copy: typeof selectedCategories = structuredClone(selectedCategories);

    const value = name as Category;

    checked ? copy.add(value) : copy.delete(value);

    onChange(copy.size ? ({ category }) => copy.has(category) : null);

    setSelectedCategories(copy);
  };

  return (
    <Filter title="Categoria">
      {categories.map((item) => (
        <div key={item} className="flex-between">
          <span>{capitalize(item)}</span>
          <input type="checkbox" name={item} onChange={handleOnChange} />
        </div>
      ))}
    </Filter>
  );
};
