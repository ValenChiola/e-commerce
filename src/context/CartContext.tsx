import {
  createContext,
  ReactNode, useCallback, useContext,
  useState
} from "react";
import { ProductDTO } from "../components/Product/api/products";
import { parseCurrency } from "../helpers/parseCurrency";

const Context = createContext({} as ContextValues);
Context.displayName = "CartContext";

export const useCartContext = () => useContext(Context);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ProductDTO[]>([]);

  const addProduct = (product: ProductDTO) => {
    const index = cart.findIndex(({ id }) => id === product.id);

    if (index === -1) // First time
      return setCart((old) => old.concat({ ...product, quantity: 1 }));

    setCart((old) =>
      old.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decreases the "quantity" of the item by 1. If the quantity is 1 at the time of decrement, the item is deleted
  const deleteProduct = (id: ProductDTO["id"]) => {
    setCart((old) =>
      old.flatMap((item) =>
        item.id === id
          ? item.quantity - 1 > 0
            ? { ...item, quantity: item.quantity - 1 }
            : []
          : item
      )
    );
  };

  const getCheckoutText = useCallback(
    () =>
      cart
        .reduce(
          (text, { title, price, quantity }) =>
            text.concat(
              `* ${title} - ${parseCurrency(price)} ${
                quantity > 1 ? `(${quantity})` : ""
              } \t\n`
            ),
          ""
        )
        .concat(
          "Total: " +
            parseCurrency(
              cart.reduce(
                (total, { price, quantity }) => total + price * quantity,
                0
              )
            )
        ),
    [cart]
  );

  const emptyCart = () => setCart([]);

  return (
    <Context.Provider
      value={{ cart, addProduct, deleteProduct, getCheckoutText, emptyCart }}
    >
      {children}
    </Context.Provider>
  );
};

// Interfaces
interface ContextValues {
  cart: ProductDTO[];
  addProduct: (product: ProductDTO) => void;
  deleteProduct: (id: ProductDTO["id"]) => void;
  getCheckoutText: () => string;
  emptyCart: () => void;
}
