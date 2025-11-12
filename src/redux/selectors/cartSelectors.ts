import { useAppSelector } from "../store";

export const useCountPizzas = () => {
  const items = useAppSelector((state) => state.cartReducer.items);
  return items.reduce((sum, item) => {
    return item.count ?? 0 + sum;
  }, 0);
};

export const useTotalPrice = () => {
  const items = useAppSelector((state) => state.cartReducer.items);
  return items.reduce((sum, item) => {
    return item.pricePizzas ?? 0 + sum;
  }, 0);
};
