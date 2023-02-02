import Axios from "axios";

Axios.defaults.baseURL = "https://fakestoreapi.com";

export const getProducts = (category?: string) =>
  Axios.get<ProductFromApi[]>(
    `/products${category ? `/category/${category}` : ""}`
  ).then(({ data }) => data.map((item) => ({ ...item, quantity: 0 })));

interface ProductFromApi {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductDTO extends ProductFromApi {
  quantity: number;
}

export enum Category {
  ELECTRONICS = "electronics",
  JEWELERY = "jewelery",
  MENS_CLOTHING = "men's clothing",
  WOMENS_CLOTHING = "women's clothing",
}
