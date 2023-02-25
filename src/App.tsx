import { Cart } from "./components/Cart/Cart";
import { CategoryFilter } from "./components/Filters/CategoryFilter";
import { PriceFilter } from "./components/Filters/PriceFilter";
import { RatingFilter } from "./components/Filters/RatingFilter";
import { Products } from "./components/Product/Products";
import { Wrapper } from "./components/Wrapper";
import { useAuthContext } from "./context/AuthContext";
import { Login } from "./components/Login/Login";
import { useMatches } from "./hooks/useMatches";
import Modal from "react-modal";

Modal.setAppElement("#root");

const App = () => {
  const { products, onFilterChange, isLoading, isError } = useMatches();

  const { me, signOut } = useAuthContext();

  if (!me) return <Login />;

  if (isLoading) return <Wrapper>Cargando datos de la sesión...</Wrapper>;

  if (isError) return <Wrapper>Hubo un error :(</Wrapper>;

  if (!products) return <Wrapper>No hay datos para mostrar</Wrapper>;

  const oneProduct = products.length === 1;

  return (
    <section>
      <nav>
        <h1 style={{ fontSize: "1.8em" }}>El D3cod3r</h1>
        <div className="flex-between">
          <div className="flex-column">
            {me.displayName ?? me.email}
            <button className="danger" onClick={signOut}>
              Cerrar sesión
            </button>
          </div>
          <Cart />
        </div>
      </nav>
      <header>
        Se {oneProduct ? "obtuvo" : "obtuvieron"} {products.length} resultado
        {!oneProduct && "s"}
      </header>
      <main>
        <aside>
          <PriceFilter onChange={onFilterChange} />
          <CategoryFilter onChange={onFilterChange} />
          <RatingFilter onChange={onFilterChange} />
        </aside>
        <Products products={products} />
      </main>
    </section>
  );
};

export default App;
