import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const candidate = state.items.find(
        ({ id, type, size }) =>
          id === action.payload.id &&
          type === action.payload.type &&
          size === action.payload.size
      );
      if (candidate) {
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
    removeItem(state, action) {
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
    setMinus(state, action) {
      const candidate = state.items.find(
        ({ id, type, size }) =>
          id === action.payload.id &&
          type === action.payload.type &&
          size === action.payload.size
      );
      if (candidate && candidate.count > 1) {
        candidate.count -= 1;
        candidate.pricePizzas -= candidate.price;
      } else {
        state.items = state.items.filter(
          (item) =>
            !(
              item.id === candidate.id &&
              item.type === candidate.type &&
              item.size === candidate.size
            )
        );
      }
    },
    setPlus(state, action) {
      const candidate = state.items.find(
        ({ id, type, size }) =>
          id === action.payload.id &&
          type === action.payload.type &&
          size === action.payload.size
      );
      if (candidate) {
        candidate.count += 1;
        candidate.pricePizzas += candidate.price;
      }
    },
  },
});

export const { addItem, removeItem, clearItems, setMinus, setPlus } =
  cartSlice.actions;
export default cartSlice.reducer;
