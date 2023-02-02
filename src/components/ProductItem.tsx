import { useMemo } from "react";
import { useCartContext } from "../context/CartContext";
import { useProductContext } from "../context/ProductContext";
import { capitalize } from "../helpers/capitalize";
import { parseCurrency } from "../helpers/parseCurrency";
import { ProductDTO } from "./Product/api/products";

export const ProductItem = ({ showDescription, ...product }: Props) => {
  const { id, title, price, image, description } = product;

  const { cart, addProduct, deleteProduct } = useCartContext();
  const { setProduct } = useProductContext();

  const { quantity } = useMemo(
    () => cart.find((item) => item.id === id) ?? { quantity: 0 },
    [cart, id]
  );

  return (
    <div className="product-item">
      <div onClick={() => setProduct(product)}>
        <div>
          <h3 style={{ padding: "0 1em" }}>{title}</h3>
          <p>{parseCurrency(price)}</p>
        </div>
        <img src={image} alt={description} width={200} height={200} />
        {showDescription && (
          <p style={{ padding: "1em" }}>{capitalize(description)}</p>
        )}
      </div>
      <div className="quantity-container">
        <button
          className="round"
          disabled={quantity < 1}
          onClick={() => deleteProduct(id)}
        >
          -
        </button>
        <span>{quantity}</span>
        <button className="round" onClick={() => addProduct(product)}>
          +
        </button>
      </div>
    </div>
  );
};

type Props = ProductDTO & { showDescription?: boolean };
