import { useEffect, useRef } from "react";
import Categories from "../components/categories";
import Sorted from "../components/sorted";
import PizzaBlock from "../components/pizza-block";
import Skeleton from "../components/pizza-block/Skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Pagination from "../components/pagination/Pagination";
//import { SearchContext } from "../components/main-component/Main";
import { useDispatch } from "react-redux"; // useSelector - хук, который позволяет вытаскивать из хранилища какой-то state
import { setCategoryID } from "../redux/slices/filterSlice";
import qs from "qs"; // чтобы вшить наши параметры в адресную строчку, чтобы спарсить параметры или сгенерировать их
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { Pizza } from "../types/pizza";

//   {/*{ searchValue } */}
const Home = () => {
  const isMounted = useRef(false); // изначально isMounted = false, чтобы параметры в URL сразу не вшивались
  // useRef используется и для хранения state, при изменении этого state(ref) не запускается перерендер
  // useRef НЕ вызывает перерендер при изменении его значения. Это ключевое отличие от useState.

  // const activeSort = useAppSelector(
  //   (state) => state.filterReducer.activeSort
  // ); // МОЖНО ОБЪЕДИНИТЬ В ОДИН useSlector и activeSort и categoryID
  // const categoryID = useAppSelector(
  //   (state) => state.filterReducer.categoryID
  // ); // следит за изменением Reducer, меняет categoryID, categoryID внутри filterReducer - это ключ в initialState в slice
  // в переменную categoryID передаем state, который хранится в slice, именно значение
  // const { categoryID, activeSort } = useSelector( // useSelector подписывает компонент на Redux-хранилище(store) и каждый раз вызывает функцию-селектор при изменении state
  //   (state) => state.filterReducer
  // );

  // const [categoryID, setCategoryID] = useState(0); // тут изменился он, а потом смотри categoryID
  // const [activeSort, setActiveSort] = useState({
  //   name: "популярности",
  //   sortProperty: "rating",
  // }); // замена объекта {} из этого компонента через set, но по данным, приходящим из дочернего компонента

  // const currentPage = useAppSelector(
  //   (state) => state.filterReducer.currentPage
  // );
  // const [currentPage, setCurrentPage] = useState(1); // для Пагинации state

  //const { searchValue } = useContext(SearchContext); // при изменении SearchContext перерисовка там, где нужно
  // const searchValue = useAppSelector(
  //   (state) => state.filterReducer.searchValue
  // );

  const { activeSort, categoryID, currentPage, searchValue } = useAppSelector(
    (state) => state.filterReducer
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // до получения пицц будем проверять есть ли у нас в URL эти параметры(параметры фильтрации URL)
  // можно с помощью: useSearchParams или window.location.search
  // useLayoutEffect(() => {
  //   if (window.location.search) {
  //     // если параметры в URL существуют, то
  //     const params = qs.parse(window.location.search.substring(1)); // парсим из наших параметров, которые есть и превращаем в объект
  //     // обратное stringify, но "?" парсить нельзя, поэтому нам надо его убирать. То есть stringify - берет объект и преобразует его
  //     // в строку для navigate, а qs.parse делает обратное, берет строку и преобразует его в объект, вытягивая параметры актуальные в объект
  //     // но вопросительный знак надо убрать
  //     // эти параметры, преобразованные в объект, теперь нужно передать в redux
  //     const sortBy = list.find((obj) => obj.sortProperty === params.sortBy);
  //     // console.log(sortBy);
  //     dispatch(
  //       setParams({
  //         sortBy, // Нужно внимательно передавать, что я передаю в свой REDUX!!!
  //       })
  //     );
  //   }
  // }, []);
  // console.log(activeSort);

  const category = categoryID > 0 ? categoryID : undefined;
  const sortBy = activeSort.sortProperty.replace("-", ""); // замена "-" на ""
  const order = activeSort.sortProperty.includes("-") ? "asc" : "desc";
  const search = searchValue ? searchValue : ""; // создали переменную для поиска ПИЦЦЫ через backend используя searchValue, который в input

  const { isPending, error, data } = useQuery<Pizza[]>({
    // data принимает мой response.json()
    queryKey: [categoryID, activeSort, searchValue, currentPage], // ключ по которому useQuery в своей реализации для идентификации задает к запросу для кэша(чтобы сохранять кэш, пока не закроешь страницу, данные будут загружены и сразу будут появляться, но как только закроешь страницу, кэш удалиться и по новой будет загружаться)
    queryFn: () =>
      axios
        .get<Pizza[]>(`https://68d42667214be68f8c688e15.mockapi.io/items`, {
          params: {
            category: category, // категории очевидно
            sortBy: sortBy, // сортировка очевидно
            order: order, // по возрастанию / убыванию
            search: search, // для поиска ЧЕГО-ЛИБО через БЭКЕНД
            page: currentPage,
            limit: 4, // по 4 пиццы на странице
          }, // category - ключ(название параметра в URL) category(ключ) : ТУТ ЗНАЧЕНИЕ ЭТОГО ПАРАМЕТРА, как и sortBy и order - ключ в параметре params
        }) // axios сам преобразует в json
        .then((response) => response.data), // мы заходим внутрь объекта response и обращаемся к ключу data и как бы вытаскиваем наши данные оттуда чтоб они сразу были одним объектом, а не вложенным объектом, если что, сделай console.log
  });

  useEffect(() => {
    if (isMounted.current) {
      // сначала isMounted.current=false, поэтому код не срабатывает при первом рендере, в конце useEffect мы делаем isMounted.current=true
      // так как isMounted.current стал true, то при изменении категории, сортировки, страницы и т.п, запустится снова useEffect, где уже isMounted.current=true,
      // так как мы изменили его состояние и он его подтягивает за собой при перерендере(из-за возможных других зависимостях)
      // тогда код сарботает и навигация тоже сработает и параметры придут в URL, useRef выступает в качестве state, который при изменении ref НЕ запускает перерендер(именно из-за самого ref)
      const queryString = qs.stringify({
        //для превращения объекта в одну строчку, чтобы ее потом вшить
        category: categoryID,
        sortBy: activeSort,
        page: currentPage,
      }); // stringify ожидает в себе принять параметры URL(как в запросе axios), категория, сортировка, страница
      // console.log(queryString); category=0&sortBy=rating&page=1
      navigate(`?${queryString}`); // передаем в URL нашу строчку из queryString, после localhost/ будет "?queryString", useNavigate обеспечивает передачу данных в URL
      // navigate принимает в себя ?category=0&sortBy=rating&page=1 и динамично изменяет это
    }
    isMounted.current = true;
  }, [categoryID, activeSort, currentPage, navigate]);

  const pizzas =
    data && data.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryID={categoryID} // потом мы передаем его обратно в дочерний компонент
          onClickCategory={(index: number) => {
            // принимает в себя индекс из дочернего компонента
            dispatch(setCategoryID(index)); // меняет принимаемый в себя индекс из дочернего компонента dispatch(test())
          }}
        />
        <Sorted
        // activeSort={activeSort}
        // onClickActiveSort={(obj) => {
        //   // принимает в себя объект из дочернего компонента
        //   setActiveSort(obj);
        // }} - заменили на redux toolkit
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {error && `Ошибка: ${error.message}`}
        {isPending &&
          [...new Array(6)].map((_, index) => <Skeleton key={index} />)}
        {pizzas}
        {/*data.data - это внутри обьекта data обратиться к ключу data*/}
        {/* {error
              ? error.message
              : isPending
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) // если isLoading=true изначально, Skeleton рендерится по 6 элементам в новом массиве, 6 скелетонов отображает
              : data.map((obj) => <PizzaBlock key={obj.id} {...obj} />)} */}
        {/*Когда isLoading=false, Skeleton перестает рендериться, рендерится наш PizzaBlock*/}
      </div>
      <Pagination />
      {/*При вызове функции onChangePage мы в дочерном
      объекте делаем там event.selected + 1, изменяя число и получаем новое число, которое принимается тут
      1+1=2, значит в number пришла 2, setCurrentPage=2.  */}
    </div>
  );
};

export default Home;

// const pizzas =
// data &&
// data
//   .filter((obj) => {
//     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
//       return true;
//     }
//     return false;
//   }) // когда мало данных, тогда это разумно использовать, для статичного массива кайф
//   .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
