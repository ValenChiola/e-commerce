import React, { useState } from "react";
import Modal from "react-modal";
import { useQuery } from "react-query";
import { Cart } from "./components/Cart";
import { CategorySelector } from "./components/CategorySelector";
import { Category, getProducts } from "./components/Product/api/products";
import { Products } from "./components/Product/Products";
import { useCartContext } from "./context/CartContext";
import INFORMATION from "./information";

Modal.setAppElement("#root");

const App = () => {
  const state = useState<Category | undefined>();

  const [category] = state;

  const { cart, emptyCart } = useCartContext();

  const { data, isLoading } = useQuery(
    ["Get All Products", category ?? INFORMATION.all],
    () => getProducts(category)
  );

  if (isLoading) return <Wrapper>Cargando...</Wrapper>;

  if (!data) return <Wrapper>No hay datos para mostrar :(</Wrapper>;

  return (
    <section>
      <nav>
        <h2>{INFORMATION.title}</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <CategorySelector state={state} />
          {!!cart.length && (
            <button className="outlined" onClick={emptyCart}>
              Vaciar carrito
            </button>
          )}
        </div>
      </nav>
      <main>
        <Products products={data} />
        <Cart />
      </main>
    </section>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <p className="loading">{children}</p>
);

export default App;
