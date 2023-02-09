import Axios from "axios";
import { App } from "../../../AppConfig";
import { ProductDTO, ProductFromApi } from "../../../types";

Axios.defaults.baseURL = App.API;

export const getProducts = () =>
  Axios.get<ProductFromApi[]>("/products").then(
    ({ data }) =>
      data.map((item) => ({
        ...item,
        rating: { ...item.rating, rate: Math.round(item.rating.rate) },
        quantity: 0,
      })) as ProductDTO[]
  );
