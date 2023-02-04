import React, { createContext, ReactNode, useContext, useState } from "react";
import { Modal } from "../components/Modal";

import { ProductItem } from "../components/Product/ProductItem";
import { ProductDTO } from "../types";

const Context = createContext({} as ContextValues);
Context.displayName = "ProductContext";

export const useProductContext = () => useContext(Context);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<ProductDTO | null>(null);

  return (
    <Context.Provider value={{ setProduct }}>
      {children}
      <Modal isOpen={!!product} onRequestClose={() => setProduct(null)}>
        {product && <ProductItem {...product} showDescription />}
      </Modal>
    </Context.Provider>
  );
};

// Interfaces
interface ContextValues {
  setProduct: React.Dispatch<React.SetStateAction<ProductDTO | null>>;
}
