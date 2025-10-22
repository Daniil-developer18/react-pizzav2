import { createSlice } from "@reduxjs/toolkit";
import qs from "qs";
const params = qs.parse(window.location.search.substring(1)); // берем строчку, убираем "?" и делаем из него объект с помощью qs.parse
console.log(params.sortBy);
// redux нужен для хранения состояний переменных вне компонентов react
const initialState = {
  // Изначальное состояние, как у useState("") - изначальное состояние будет ""
  categoryID: params.category ? Number.parseInt(params.category) : 0, // проверяем, params.category = true? если да, то парсим как число params.category, если false, то 0
  activeSort: params.sortBy
    ? params.sortBy
    : {
        name: "популярности",
        sortProperty: "rating",
      }, // у нас изначально params.sortBy = undefined, это изначально как бы false, поэтому мы по false : сразу приравниваем объект {name:, sortProperty:},
  // у нас появляется инициализированное значение activeSort этого объекта, потом когда идет изменение, наш params.sortBy становится true с новыми
  // значениями в объекте, и так как true, приравнивается activeSort к params.sortBy
  currentPage: params.page ? Number.parseInt(params.page) : 1, // тут также, как и в categoryID
};

export const filterSlice = createSlice({
  // логику для обработки нашего state, чтобы сделать Slice мы его создаем с помощью createSlice
  name: "filters",
  initialState, // изначальное состояние
  reducers: {
    // Какие будут методы для изменения состояния
    setCategoryID(state, action) {
      // то что я передаю при вызове метода в компоненте, это идет в action.payload, action - объект, который формирует redux при вызове и хранит в себе дополнительные параметры(которые могут понадобиться)
      state.categoryID = action.payload; // конкретно в этом случае action.payload = index
    },
    setActiveSort(state, action) {
      // то что я передаю при вызове метода в компоненте, это идет в action.payload, action - объект, который формирует redux при вызове и хранит в себе дополнительные параметры(которые могут понадобиться)
      state.activeSort = action.payload; // конкретно в этом случае action.payload = index
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    resetState(state) {
      state.categoryID = 0;
      state.currentPage = 1;
      state.activeSort = {
        name: "популярности",
        sortProperty: "rating",
      };
    },
  },
});

export const { setCategoryID, setActiveSort, setCurrentPage, resetState } =
  filterSlice.actions; // actions - действия. Отвечает за выполнение методов(например increment, decrement)
// По сути для вызова этого метода нужно его экспортировать, а дальше смотри Main.jsx
export default filterSlice.reducer; // reducer, который будет выполнять логику обработки всего нашего state(методов) - изменение state
// export default categorySlice.reducer; - ОН ИДЕТ в store.js!!!!
