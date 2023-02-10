import { ProductDTO } from "../../types";

const getCart = (userId: string) =>
  JSON.parse(localStorage.getItem(`cart-${userId}`) ?? "[]") as ProductDTO[];

export default getCart 
