import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice"; // Здесь мы принимаем экспорт слайсов
import cartReducer from "./slices/cartSlice";
import { useSelector } from "react-redux";
// Redux нужен, чтобы не было перерендера всех компонентов(такое происходит при использовании useContext при изменение ?state?), перерендер только в определенном компоненте при Redux
export const store = configureStore({
  reducer: { filterReducer, cartReducer }, // вот это название должно быть в const categoryID = useSelector((state) => state.categoryReducer.value);
}); // redux-хранилище

export type RootState = ReturnType<typeof store.getState>; // получение типа/типов всего хранилища, разеделенный по редьюсерам
export const useAppSelector = useSelector.withTypes<RootState>();

// console.log(store.dispatch);
// console.log(configureStore);
// Мне пока на данный момент нужно понять, что в store есть dispatch.
// store - redux-хранилище, в нем хранится вся логика с redux-toolkit
// Изначально создаем хранилище, reducer : { counter: counterReducer }, где counter - это хранилище слайса counterReducer,
// в counterReducer мы говорим, что у нас: смотреть файл counterReducer
