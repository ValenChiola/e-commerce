import { useCallback, useState } from "react";
import { useCartContext } from "../context/CartContext";
import INFOMARTION from "../information";
import { Modal } from "./Modal";
import { Products } from "./Product/Products";

export const Cart = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart, getCheckoutText } = useCartContext();

  const checkout = useCallback(
    () =>
      window.open(
        `https://wa.me/${INFOMARTION.phone}?text=${getCheckoutText()}`
      ),
    [getCheckoutText]
  );

  if (!cart.length) return null;

  return (
    <>
      <button className="success sticky" onClick={() => setShowCart(true)}>
        Ver carrito ({cart.length})
      </button>
      <Modal isOpen={showCart} onRequestClose={() => setShowCart(false)}>
        <h1 style={{ margin: 0, marginBottom: 20 }}>Tu carrito: </h1>
        <Products products={cart} />
        <button className="success" onClick={checkout}>
          Comprar
        </button>
      </Modal>
    </>
  );
};
