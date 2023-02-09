import { ProductDTO } from "../../types";

export const getCart = (userId: string) =>
  JSON.parse(localStorage.getItem(`cart-${userId}`) ?? "[]") as ProductDTO[];
