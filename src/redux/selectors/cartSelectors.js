import { useSelector } from "react-redux";

export const useCountPizzas = () => {
  const items = useSelector((state) => state.cartReducer.items);
  return items.reduce((sum, item) => {
    return item.count + sum;
  }, 0);
};

export const useTotalPrice = () => {
  const items = useSelector((state) => state.cartReducer.items);
  return items.reduce((sum, item) => {
    return item.pricePizzas + sum;
  }, 0);
};
