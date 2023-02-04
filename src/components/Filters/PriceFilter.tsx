import { useState } from "react";
import { FilterProps } from "../../types";
import { Filter } from "./Filter";

export const PriceFilter = ({ onChange }: FilterProps) => {
  const [min, setMin] = useState<number | null>(null);
  const [max, setMax] = useState<number | null>(null);

  const handleMinChange = ({ target: { value } }: ChangeEvent) => {
    const num = Math.max(0, +value);

    onChange(({ price }) => price >= num && price <= (max ?? Infinity));

    setMin(num);
  };

  const handleMaxChange = ({ target: { value } }: ChangeEvent) => {
    const num = Math.max(0, +value);

    onChange(({ price }) => price >= (min ?? 0) && price <= num);

    setMax(num);
  };

  const handleDeleteFilters = () => {
    setMin(null);
    setMax(null);
    onChange(({ price }) => price >= 0 && price <= Infinity);
  };

  return (
    <Filter title="Precio">
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
