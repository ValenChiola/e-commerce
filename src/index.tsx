import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { UIProvider } from "./context/UIContext";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <UIProvider>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </UIProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
