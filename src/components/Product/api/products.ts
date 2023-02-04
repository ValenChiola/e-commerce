import Axios from "axios";
import { ProductDTO, ProductFromApi } from "../../../types";

Axios.defaults.baseURL = "https://fakestoreapi.com";

export const getProducts = () =>
  Axios.get<ProductFromApi[]>("/products").then(
    ({ data }) =>
      data.map((item) => ({
        ...item,
        rating: { ...item.rating, rate: Math.round(item.rating.rate) },
        quantity: 0,
      })) as ProductDTO[]
  );
