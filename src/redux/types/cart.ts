export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count?: number;
  pricePizzas?: number;
};

export interface CartSliceState {
  // interface типизурет только объект, а type может быть типа константой, типа type Test = string[]
  items: CartItem[];
}
