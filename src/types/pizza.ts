export interface Pizza {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
}

export type PizzaInfo = Pick<Pizza, "title" | "imageUrl" | "price">;
