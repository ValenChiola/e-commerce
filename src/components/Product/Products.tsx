import { ProductItem } from "../ProductItem";
import { ProductDTO } from "./api/products";

export const Products = ({ products }: { products: ProductDTO[] }) => (
  <div className="products">
    {products.map((item) => (
      <ProductItem key={item.id} {...item} />
    ))}
  </div>
);
