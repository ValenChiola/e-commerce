export type FilterFn = ((product: ProductDTO) => boolean) | null;

export type FilterTypes = "price" | "category" | "rating";

export interface FilterProps {
  onChange: (filter: FilterFn, type: FilterTypes) => void;
}

export interface ProductDTO extends ProductFromApi {
  quantity: number;
}

export interface ProductFromApi {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  rating: {
    rate: number;
    count?: number;
  };
}

export enum Category {
  ELECTRONICS = "electronics",
  JEWELERY = "jewelery",
  MENS_CLOTHING = "men's clothing",
  WOMENS_CLOTHING = "women's clothing",
}
