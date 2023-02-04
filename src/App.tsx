import React, { useCallback, useMemo, useState } from "react";
import Modal from "react-modal";
import { useQuery } from "react-query";
import { Cart } from "./components/Cart";
import { CategoryFilter } from "./components/Filters/CategoryFilter";
import { PriceFilter } from "./components/Filters/PriceFilter";
import { RatingFilter } from "./components/Filters/RatingFilter";
import { getProducts } from "./components/Product/api/products";
import { Products } from "./components/Product/Products";
import INFORMATION from "./information";
import { FilterFn, FilterProps, Filters, ProductDTO } from "./types";

Modal.setAppElement("#root");

const defaultFilters = {
  price: null,
  category: null,
  rating: null,
};

const App = () => {
  const [filters, setFilters] = useState<Record<Filters, FilterFn>>(
    () => defaultFilters
  );

  const { data, isLoading } = useQuery("Get All Products", getProducts);

  const matches = useMemo(() => {
    const filtersToApply = Object.values(filters).filter(Boolean);

    let matches: ProductDTO[] = structuredClone(data);

    filtersToApply.forEach(
      (filter) => filter && (matches = matches.filter(filter))
    );

    return matches;
  }, [data, filters]);

  const getOnChangeFn = useCallback(
    (key: Filters): FilterProps["onChange"] =>
      (filter) =>
        setFilters((old) => ({ ...old, [key]: filter })),
    []
  );

  if (isLoading) return <Wrapper>Cargando...</Wrapper>;

  if (!matches) return <Wrapper>No hay datos para mostrar :(</Wrapper>;

  return (
    <section>
      <nav>
        <h2>{INFORMATION.title}</h2>
        <Cart />
      </nav>
      <main>
        <aside>
          <PriceFilter onChange={getOnChangeFn("price")} />
          <CategoryFilter onChange={getOnChangeFn("category")} />
          <RatingFilter onChange={getOnChangeFn("rating")} />
        </aside>
        <Products products={matches} />
      </main>
    </section>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <p className="loading">{children}</p>
);

export default App;
