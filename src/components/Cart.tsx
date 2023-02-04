import { useCallback, useState } from "react";
import { useCartContext } from "../context/CartContext";
import INFORMATION from "../information";
import { Modal } from "./Modal";
import { Products } from "./Product/Products";

export const Cart = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart, emptyCart, getCheckoutText } = useCartContext();

  const checkout = useCallback(
    () =>
      window.open(
        `https://wa.me/${INFORMATION.phone}?text=${getCheckoutText()}`
      ),
    [getCheckoutText]
  );

  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => setShowCart(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width={25}
          height={25}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        {!!cart.length && <p>({cart.length})</p>}
      </div>
      <Modal isOpen={showCart} onRequestClose={() => setShowCart(false)}>
        {cart.length ? (
          <>
            <h1 style={{ margin: 0, marginBottom: 20 }}>Tu carrito: </h1>
            <Products products={cart} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginTop: "1.5em",
              }}
            >
              <button
                className="danger"
                onClick={() => {
                  emptyCart();
                  setShowCart(false);
                }}
              >
                Vaciar
              </button>
              <button className="success" onClick={checkout}>
                Comprar
              </button>
            </div>
          </>
        ) : (
          <h3>Tu carrito está vacio :/</h3>
        )}
      </Modal>
    </>
  );
};
