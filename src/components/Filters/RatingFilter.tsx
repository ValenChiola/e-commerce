import React, { useState } from "react";
import { FilterProps } from "../../types";
import { Rating } from "../Product/Rating";
import { Filter } from "./Filter";

export const RatingFilter = ({ onChange }: FilterProps) => {
  const [selectedRatings, setSelectedRatings] = useState<Set<number>>(
    () => new Set()
  );

  const handleOnChange = ({
    target: { name, checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const copy: typeof selectedRatings = structuredClone(selectedRatings);

    checked ? copy.add(+name) : copy.delete(+name);

    onChange(copy.size ? ({ rating: { rate } }) => copy.has(rate) : null, 'rating');

    setSelectedRatings(copy);
  };

  return (
    <Filter title="Rating">
      {[5, 4, 3, 2, 1].map((rate) => (
        <div key={rate} className="flex-between">
          <Rating rate={rate} />
          <input type="checkbox" name={`${rate}`} onChange={handleOnChange} />
        </div>
      ))}
    </Filter>
  );
};
