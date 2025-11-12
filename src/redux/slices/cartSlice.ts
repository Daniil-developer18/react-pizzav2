import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartSliceState } from "../types/cart";

const initialState: CartSliceState = {
  items: [],
};

const findUniquePizza = (
  items: CartItem[],
  action: PayloadAction<CartItem>
) => {
  const candidate = items.find(
    ({ id, type, size }) =>
      id === action.payload.id &&
      type === action.payload.type &&
      size === action.payload.size
  );
  return candidate;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const candidate = findUniquePizza(state.items, action);
      if (candidate && candidate.count && candidate.pricePizzas) {
        candidate.count += 1;
        candidate.pricePizzas += action.payload.price;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
          pricePizzas: action.payload.price,
        }); // в state.items пушим action.payload, внтурь массива
      }
      // state.items.reduce хранит в себе добавленные пользователем объекты. У этих объектов есть price(obj.price), мы возвращаем obj.price + sum(дефолтный js)
      // sum у нас изначально 0, мы его так и поставили, потом мы суммируем obj.price+sum, наш sum поменялся, уже не 0, стал 450 например, ну крч ты эт знаешь
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter(
        // фильтровать и присваивать в state.items ТО, что НЕ совпадает с ТЕМ, что я ПЕРЕДАЮ, а ТО, что СОВПАДАЕТ, убирать по сути
        (item) =>
          !(
            item.id === action.payload.id &&
            item.type === action.payload.type &&
            item.size === action.payload.size
          )
      );
    },
    clearItems(state) {
      state.items = [];
    },
    setMinus(state, action: PayloadAction<CartItem>) {
      const candidate = findUniquePizza(state.items, action);
      if (
        candidate &&
        candidate.count &&
        candidate.pricePizzas &&
        candidate.count > 1
      ) {
        candidate.count -= 1;
        candidate.pricePizzas -= candidate.price;
      } else {
        state.items = state.items.filter(
          (item) =>
            candidate &&
            !(
              item.id === candidate.id &&
              item.type === candidate.type &&
              item.size === candidate.size
            )
        );
      }
    },
    setPlus(state, action: PayloadAction<CartItem>) {
      const candidate = findUniquePizza(state.items, action);
      if (candidate && candidate.count && candidate.pricePizzas) {
        candidate.count += 1;
        candidate.pricePizzas += candidate.price;
      }
    },
  },
});

// export const selectCart = (state: RootState) => state.cartReducer.items; // создание селектора для использования в компонентах,
// если он повторяется в разных компонентах, чтоб заменить тем, что создали // добавил селектор

export const { addItem, removeItem, clearItems, setMinus, setPlus } =
  cartSlice.actions;
export default cartSlice.reducer;
