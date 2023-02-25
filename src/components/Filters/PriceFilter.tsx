import { useState } from "react";
import { FilterProps } from "../../types";
import { Filter } from "./Filter";

export const PriceFilter = ({ onChange }: FilterProps) => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(Infinity);

  const handleMinChange = ({ target: { value } }: ChangeEvent) => {
    const num = Math.max(0, +value);

    onChange(({ price }) => price >= num && price <= (max ?? Infinity), 'price');

    setMin(num);
  };

  const handleMaxChange = ({ target: { value } }: ChangeEvent) => {
    const num = Math.max(0, +value);

    onChange(({ price }) => price >= (min ?? 0) && price <= num, 'price');

    setMax(num);
  };

  const handleDeleteFilters = () => {
    setMin(0);
    setMax(Infinity);
    onChange(({ price }) => price >= 0 && price <= Infinity, 'price');
  };

  return (
    <Filter title="Price">
      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <label>
          Min:
          <input type="number" value={min ?? 0} onChange={handleMinChange} />
        </label>
        <label>
          Max:
          <input
            type="number"
            value={max ?? Infinity}
            onChange={handleMaxChange}
          />
        </label>
      </div>
      <button
        className="success"
        style={{ marginTop: "1.5em" }}
        onClick={handleDeleteFilters}
      >
        Borrar filtro
      </button>
    </Filter>
  );
};

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
