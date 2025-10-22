import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector - хук, который позволяет вытаскивать из хранилища какой-то state
import { setActiveSort } from "../../redux/slices/filterSlice";
export const list = [
  { name: "популярности ↓", sortProperty: "rating" }, // desc - по убыванию
  { name: "популярности ↑", sortProperty: "-rating" }, // asc - по возрастанию
  { name: "цене ↓", sortProperty: "price" },
  { name: "цене ↑", sortProperty: "-price" },
  { name: "алфавиту ↓", sortProperty: "-title" },
  { name: "алфавиту ↑", sortProperty: "title" },
];

function Sorted() {
  const activeSort = useSelector((state) => state.filterReducer.activeSort); // вытаскиваем информацию о сортировке с помощью redux, следит за изменение activeSort, компонент перерисовывается
  // получает новые данные, activeSort уже имеет другое значение. У меня в filterReducer могут быть много reducerов, и если я буду писать state.filterReducer, то у меня будет перерендер этого компонента
  // даже если меняется не activeSort а что то другое внутри этого filterReducer, поэтому мы именно говорим ОТСЛЕЖИВАЙ activeSort для перерендера этого компонента
  const dispatch = useDispatch();

  const sortRef = useRef();

  const [openSort, setOpenSort] = useState(false);
  // здесь могло быть const sortName = list[activeSort]

  // const onClickSomeSort = (obj) => {
  //   // передает в родительский компонент объект
  //   dispatch(setActiveSort(obj)); // передает в родительский компонент объект
  // убрали отсюда setOpenSort(false);
  // };

  // обработчик клика на весь body(dom), чтоб проверять был клик внутри поп-апа или вне него
  useEffect(() => {
    const handleClickOutside = (event) => {
      //console.log(event.composedPath()); // возвращает объект addEventListener и там есть composedPath(), нужно проверить, есть ли в нем там наш div class="sort",
      // а div class="sort" мы узнаем из sortRef.current
      if (event.composedPath().includes(sortRef.current)) {
        // клик на sort? если true, то станет false, не отработает,
        // если false, так как кликнули не на sort,то станет true и отработает закрытие(не конфликтует с другими действиями),
        // если не делать логическое НЕ, то будет конфликт при нажатии onClick, даже если сделать через else, то все равно будет возникать
        // конфликт и при нажатии на выбор цене, популярности, не будет закрываться, как мы зудмали при onClickSomeSort
        setOpenSort((prev) => {
          // в prev приходит всегда актуальное значение моего openSort
          return !prev; // вовзращаем перевернутое актуальное значение, пришел openSort = true(актуальное значение), вернули openSort=false
        });
      } else {
        setOpenSort(false); // если тыкнули вне sort, то закрываем pop-up окно
      }
      //console.log("check");
    }; // создаем handleClickOutside, чтобы использовать его и в addEventListener при монтировании, и в removeEventListener при размонтировании
    document.addEventListener("click", handleClickOutside); // addEventListener - метод, который "подписывает" функцию-обработчик на событие
    // у элемента dom, когда событие произойдет, обработчик вызовется, event - строка названия события("click", "scroll", "keydown")
    return () => {
      // когда мы уходим например с этой страницы на другую, происходит unmount и только тогда срабатывает return
      document.removeEventListener("click", handleClickOutside); // при unmound и срабатывании return, у нас удалится обработчик событий, это делается
      // для того, чтобы каждый раз переходя с одной страницы на другую, и так несколько раз, не накладывались обработчики событий по не сколько штук или даже
      // десяток штук на одно и то же действие
    };
  }, []); // return в конце useEffect нужен, чтобы он сработал тогда, когда компонент будет размонтирован

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span>{activeSort.name}</span>
      </div>
      {openSort && ( // Выводим, показываем пользователю <div> ... </div> при
        // условии если openSort === true с помощью &&
        // тернарный оператор(усл?тру:фолс) и амперсанды - возвращают одно из значений(одно значение)
        // if else - сюда не подходит, это синтаксическая ошибка
        <div className="sort__popup">
          <ul>
            {list.map((obj) => (
              <li
                key={obj.name}
                onClick={() => dispatch(setActiveSort(obj))} // передает в функцию
                className={
                  activeSort.sortProperty === obj.sortProperty && "active"
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sorted;

// if (open && age>=15) {console.log("ok")} - console.log("ok") отработает при услвоии, если age>=15 - то есть true
// и если open = true, тогда мы это увидим.
// но как работает {openSort && (<div>...</div>)} ? Верхнюю запись можно интерпретировать по другому, и теперь ты поймешь:
// open && age>=15 && console.log("ok") - это то же самое, что и if (open && age>=15) {console.log("ok")}
// то есть у нас {openSort && (<div>...</div>)} - ВЫВЕДИ (<div>...</div>) при условии если openSort = true, это делается
// с помощью &&. То есть иди проверь open = true? если true, то проверь age>=15? если true, то иди дальше и отработай
// эту часть кода: console.log("ok")
// тут такая же логика, иди проверь openSort === true?, если true, то иди и отработай часть кода с <div></div>
// && - амперсанд
// 5 && 6 => выведет 6, отработает последнее true, если все остальное было true
// 0 && 6 => ничего не отработает, ибо 0 = false

// можно сделать вот так:
// {
//   openSort ? (
//     <div className="sort__popup">
//       <ul>
//         <li className="active">популярности</li>
//         <li>цене</li>
//         <li>алфавиту</li>
//       </ul>
//     </div>
//   ) : (
//     ""
//   );
// } но через && лучше
