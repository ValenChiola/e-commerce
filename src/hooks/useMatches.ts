import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getProducts } from "../components/Product/api/products";
import { FilterFn, FilterProps, FilterTypes } from "../types";

const defaultFilters: Record<FilterTypes, FilterFn> = {
  price: null,
  category: null,
  rating: null,
};

export const useMatches = () => {
  const [filters, setFilters] = useState(() => defaultFilters);

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery("Get All Products", getProducts);

  const matches = useMemo(
    () =>
      Object.values(filters)
        .filter(Boolean)
        .reduce((acum, filter) => acum.filter(filter!), data),
    [data, filters]
  );

  const onFilterChange: FilterProps["onChange"] = useCallback(
    (filter, type) => setFilters((old) => ({ ...old, [type]: filter })),
    []
  );

  return {
    products: matches,
    onFilterChange,
    isLoading,
    isError,
  };
};
