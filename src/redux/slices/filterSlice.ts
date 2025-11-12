import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import qs from "qs";
import { FilterSliceState, Parse, Sort } from "../types/filter";

const params: Parse = qs.parse(window.location.search.substring(1)); // берем строчку, убираем "?" и делаем из него объект с помощью qs.parse
//console.log(params.sortBy);
// redux нужен для хранения состояний переменных вне компонентов react
const initialState: FilterSliceState = {
  // Изначальное состояние, как у useState("") - изначальное состояние будет ""
  categoryID: params.category ? Number.parseInt(params.category, 10) : 0, // проверяем, params.category = true? если да, то парсим как число params.category, если false, то 0
  activeSort: params.sortBy
    ? params.sortBy
    : {
        name: "популярности",
        sortProperty: "rating",
      }, // у нас изначально params.sortBy = undefined, это изначально как бы false, поэтому мы по false : сразу приравниваем объект {name:, sortProperty:},
  // у нас появляется инициализированное значение activeSort этого объекта, потом когда идет изменение, наш params.sortBy становится true с новыми
  // значениями в объекте, и так как true, приравнивается activeSort к params.sortBy
  currentPage: params.page ? Number.parseInt(params.page, 10) : 1, // тут также, как и в categoryID
  searchValue: "", // добавили searchValue
};

export const filterSlice = createSlice({
  // логику для обработки нашего state, чтобы сделать Slice мы его создаем с помощью createSlice
  name: "filters",
  initialState, // изначальное состояние
  reducers: {
    // Какие будут методы для изменения состояния
    setCategoryID(state, action: PayloadAction<number>) {
      // то что я передаю при вызове метода в компоненте, это идет в action.payload, action - объект, который формирует redux при вызове и хранит в себе дополнительные параметры(которые могут понадобиться)
      state.categoryID = action.payload; // конкретно в этом случае action.payload = index
    },
    setActiveSort(state, action: PayloadAction<Sort>) {
      // то что я передаю при вызове метода в компоненте, это идет в action.payload, action - объект, который формирует redux при вызове и хранит в себе дополнительные параметры(которые могут понадобиться)
      state.activeSort = action.payload; // конкретно в этом случае action.payload = index
    },
    setCurrentPage(state, action: PayloadAction<number>) {
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
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setCategoryID,
  setActiveSort,
  setCurrentPage,
  resetState,
  setSearchValue,
} = filterSlice.actions; // actions - действия. Отвечает за выполнение методов(например increment, decrement)
// По сути для вызова этого метода нужно его экспортировать, а дальше смотри Main.jsx
export default filterSlice.reducer; // reducer, который будет выполнять логику обработки всего нашего state(методов) - изменение state
// export default categorySlice.reducer; - ОН ИДЕТ в store.js!!!!

// делал так:
// categoryID:
//     typeof params.category === "string" && params.category
//       ? Number.parseInt(params.category, 10)
//       : 0,
//   activeSort:
//     typeof params.sortBy === "object" && params.sortBy
//       ? (params.sortBy as Sort)
//       : {
//           name: "популярности",
//           sortProperty: "rating",
//         },
//   currentPage:
//     typeof params.page === "string" && params.page
//       ? Number.parseInt(params.page, 10)
//       : 1,
// пока не узнал, что можно так: const params = qs.parse(window.location.search.substring(1)) as Parse;
// qs не поддерживает generic-типы напрямую, то есть нельзя написать
// const params = qs.parse<{
//   category?: string;
//   page?: string;
//   sortBy?: Sort;
// }>(window.location.search.substring(1));
// потому что библиотека qs не объявляет generic-параметры для функции parse, поэтому вместо использования generic, мы вручную приводим типы

// А вообще! было бы правильнее вот так:
// interface Parse {
//   category?: string;
//   page?: string;
//   sortBy?: Sort;
// }
// const params = qs.parse<Parse>(window.location.search.substring(1)), внутри вот этого <T>, где <T> - это generic-параметр функции,
// он позволяет сказать TypeScript'у, какой тип мы ожидаем от функции
