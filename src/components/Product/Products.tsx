import { ProductDTO } from "../../types";
import { ProductItem } from "./ProductItem";

export const Products = ({ products }: { products: ProductDTO[] }) => (
  <div className="products">
    {products.map((item) => (
      <ProductItem key={item.id} {...item} />
    ))}
  </div>
);
