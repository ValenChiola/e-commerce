import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { useQuery } from "react-query";
import { Cart } from "./components/Cart/Cart";
import { CategoryFilter } from "./components/Filters/CategoryFilter";
import { PriceFilter } from "./components/Filters/PriceFilter";
import { RatingFilter } from "./components/Filters/RatingFilter";
import { getProducts } from "./components/Product/api/products";
import { Products } from "./components/Product/Products";
import { Wrapper } from "./components/Wrapper";
import { useAuthContext } from "./context/AuthContext";
import { useCartContext } from "./context/CartContext";
import { Login } from "./Login/Login";
import { FilterFn, FilterProps, FilterTypes, ProductDTO } from "./types";

Modal.setAppElement("#root");

const defaultFilters: Record<FilterTypes, FilterFn> = {
  price: null,
  category: null,
  rating: null,
};

const onBeforeUnLoad = (uid: string, cart: ProductDTO[]) =>
  localStorage.setItem(`cart-${uid}`, JSON.stringify(cart));

const App = () => {
  const [filters, setFilters] = useState(() => defaultFilters);

  const { data, isLoading } = useQuery("Get All Products", getProducts);

  const { me, signOut } = useAuthContext();
  const { cart } = useCartContext();

  const handleSignOut = () => {
    if (!me) return;
    onBeforeUnLoad(me.uid, cart);
    signOut();
  };

  const matches = useMemo(() => {
    if (!data) return;

    const filtersToApply = Object.values(filters).filter(Boolean);

    let matches: typeof data = structuredClone(data);

    filtersToApply.forEach(
      (filter) => filter && (matches = matches.filter(filter))
    );

    return matches;
  }, [data, filters]);

  const getOnChangeFn = useCallback(
    (key: FilterTypes): FilterProps["onChange"] =>
      (filter) =>
        setFilters((old) => ({ ...old, [key]: filter })),
    []
  );

  useEffect(() => {
    if (!me) return;

    const callback = () => onBeforeUnLoad(me.uid, cart);

    window.addEventListener("beforeunload", callback);

    return () => window.removeEventListener("beforeunload", callback);
  }, [me, cart]);

  if (!me) return <Login />;

  if (isLoading) return <Wrapper>Cargando datos de la sesión...</Wrapper>;

  if (!matches) return <Wrapper>No hay datos para mostrar :(</Wrapper>;

  const oneProduct = matches.length === 1;

  return (
    <section>
      <nav>
        <h1 style={{ fontSize: "1.8em" }}>El D3cod3r</h1>
        <div className="flex-between">
          <div className="flex-column">
            {me.displayName ?? me.email}
            <button className="danger" onClick={handleSignOut}>
              Cerrar sesión
            </button>
          </div>
          <Cart />
        </div>
      </nav>
      <header>
        Se {oneProduct ? "obtuvo" : "obtuvieron"} {matches.length} resultado
        {!oneProduct && "s"}
      </header>
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



export default App;
