import Axios from "axios";
import { App } from "../../../AppConfig";
import { ProductDTO, ProductFromApi } from "../../../types";

Axios.defaults.baseURL = App.API;

export const getProducts = () =>
  Axios.get<ProductFromApi[]>("/products").then(
    ({ data }) => data.map(parseItem) as ProductDTO[]
  );

const parseItem = ({ rating: { rate, count = 0 }, ...rest }: ProductFromApi) => ({
  ...rest,
  rating: { count, rate: Math.round(rate) },
  quantity: 0,
});
