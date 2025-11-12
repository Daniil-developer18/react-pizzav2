import "../../scss/app.scss";
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";
import Cart from "../../pages/Cart";
import { Routes, Route } from "react-router-dom";
import Pizza from "../../pages/Pizza";
import MainLayout from "../layouts/MainLayout";
// import { createContext, useState } from "react";
// import { useSelector, useDispatch } from "react-redux"; // импортируем хуки react-redux. useSelector что-то вроде как useContext,
// он отвечает за вытаскивание данных из хранилища, useDispatch - говорит сделай ЧТО-ТО, по сути существует для отработки методов,
// которые мы импортируем ниже. чтобы созданный метод test отработал, нужен хук useDispatch. делаем dispatch=useDispatch(), потом
// dispatch(test()) - отработает наш метод test(), без dispatch не отработает, ибо test() возвращает объект, а dispatch уже на уровне библиотеки
// работает с ним и делает свою магию
// import { decrement, increment } from "../../redux/slices/filterSlice"; // импортируем методы наши

// При загрузке сайта чтоб у нас не было пустого массива, а потом появлялись данные и они отрисовывались некрасиво,
// используем скелетон, он как будто имитирует подгрузку данных, а потом появляются данные
// это можно сделать и самим, написать ВСЮ логику самим и все будет работать, но лучше использовать библиотеку skeletonreact
// Если фигурные собки пишу, то и return нужен. А если бы я писал без фигурных скобок, то то что бы я и писал, то сразу бы и возвращалось(ретернулось)

// export const SearchContext = createContext(""); // возвращает объект какой-то, создает контекст. Создает контекст в переменную SearchContext
// export для экспорта, очевидно. Но это очень важно. Только при экспортировании нашего созданного контекста, мы сможем им воспользоваться в других компонентах
function Main() {
  // const count = useSelector((state) => state.counter.value); следит за изменением counter.value
  // const dispatch = useDispatch();

  //   const [items, setItems] = useState([]); // для доп. знаний - useState при перерендере оставляет прошлое значение, например items = [] - первый рендер
  // setItems([1, 2, 3]), происходит второй рендер, items уже = [1, 2, 3], потом допустим происходит какой-то третий рендер, четвертый, пятый
  // items так и будет [1, 2, 3], он не будет становиться [], если не изменить состояние
  // console.log(items);
  // наш компонент перерендеривается потому что изменяется состояние с помощью setItems,
  // был [], стал [{},{},{},....], то есть items = [{},{},{},....]
  // то есть компонент перерендеривается с новыми данными в items. не [], а [.........]

  // const [isLoading, setIsLoading] = useState(true); // для Skeleton

  // useEffect(() => {
  //   // useEffect НЕ срабатывает повторно из-за ключевого момента []
  //   fetch("https://68d42667214be68f8c688e15.mockapi.io/items")
  //     .then((response) => {
  //       return response.json(); // без return ничего работать не будет, ты еще не понимаешь силу return
  //     })
  //     .then((json) => {
  //       setItems(json);
  //       console.log(json);
  //     })
  //     .finally(() => {
  //       setIsLoading(false); // чтоб Skeleton скрывался
  //     });
  // }, []); // в нашем случае запуск один раз по ключевому моменту [] useEffect срабатывает из-за ключевого момента []
  // также useEffect запускается каждый раз при изменении ключевого момента, то есть
  // мы внутри useEffect создаем зависимость какую-либо и при изменении этой зависимости
  // будет отрабатывать useEffect снова, меняем зависимость -> отработка useEffect

  // useEffect всегда ожидает увидеть массив при зависимости

  // fetch - отправить запрос, буквально ДАЙ, then - тогда. То есть
  // отправь запрос fetch, если получили ответ, тогда then (пишем что тогда сделать), response.json - тогда переконвертируй response в формат json
  // тогда верни в консоль лог например json .then((json)=>{console.log(json)})

  // Жизненный цикл useEffect:
  // 1. Компонент монтируется
  // 2. useEffect срабатывает (из-за [])
  // 3. Выполняется fetch
  // 4. setItems обновляет состояние
  // 5. Компонент перерендеривается
  // 6. useEffect НЕ срабатывает (потому что [] не изменился)
  // 7. Готово! ✅

  // const [searchValue, setSearchValue] = useState("");
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        {/*searchValue={searchValue} - тоже вырезали*/}
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/pizza/:id" element={<Pizza />} />
        {/*Мы ставим path="*" - это означает, что если НИ ОДНА ссылка не подхдодит из наших, то выводим страницу not found
          :id - динамический параметр */}
      </Route>
    </Routes>
  );
}

export default Main; // ток один может быть

// либо вот так:
/* <PizzaBlock
key={obj.id}
title={obj.title}
price={obj.price}
image={obj.imageUrl} раньше был image, поменял на imageUrl чтоб можно было сделать {...obj}
sizes={obj.sizes}
types={obj.types}
></PizzaBlock> */

/* <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button> */

/* <SearchContext.Provider> */

/* в <SearchContext.Provider value={{ searchValue, setSearchValue }}> хранилось раньше value={{ searchValue, setSearchValue }}, но заменили на redux!!! */

/*Оборачиваем наши компоненты контекстом с использованием .Provider для передачи в дочерние компоненты и передаем то, что хотим передать для дальнейшего использования: value={{SOMETHING FOR FUTURE USE}} */

/*.Provider - это компонент. Теперь о нашем контексте знают все. Без .Provider работать не будет. Каждый объект Context используется вместе с Privder компонентом, который позволяет дочерним компонентам, использующим этот контекст подписаться на его изменения, компонент Provider принимает проп value, который будет передан во все дочерние компоненты, использующие этот контекст  */

/*searchValue={searchValue} setSearchValue={setSearchValue} - это вырезали, ибо юзаем контекст*/

/* </SearchContext.Provider> */
