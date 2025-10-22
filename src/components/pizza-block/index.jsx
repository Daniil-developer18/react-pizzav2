import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
const typeNames = ["тонкое", "традиционное"]; // если константа статичная, ее нужно выносить из функции

function PizzaBlock(props) {
  // вместо того, чтобы писать props и потом доставать из него props.title и props.price, мы
  // можем прокидывать сразу title и price, вместо (price) мы пишем ({title, price}) и тогда мы можем сразу прокидывать title и price без props
  // Это называется деструктуризация

  const [activeType, setActiveType] = useState(props.types[0]); // props.types - возвращаем нам [0, 1] или [0] или [1]
  // и чтобы обратиться к ПЕРВОМУ ЭЛЕМЕНТУ В МАССИВЕ, мы просто юзаем НУЛЕВОЙ ИНДЕКС, ведь нулевой индекс - это всегда первый
  // элемент в массиве. Данил умнич. Даниил не умнич.
  const [activeSize, setActiveSize] = useState(0);
  const items = useSelector((state) => state.cartReducer.items);
  const dispatch = useDispatch();

  const onClickAdd = () => {
    const item = {
      id: props.id,
      title: props.title,
      price: props.price,
      imageUrl: props.imageUrl,
      type: typeNames[activeType],
      size: props.sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  const getPizzaCount = () => {
    return (
      items.find(
        (item) =>
          item.id === props.id &&
          item.type === typeNames[activeType] &&
          item.size === props.sizes[activeSize]
      )?.count ?? 0 // ?. - если есть свойство count, то обратиться к нему, если нет, то => ??
    );
  };
  //console.log(props.title, props.price, props.imageUrl, props.sizes);

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={props.imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{props.title}</h4>
      {/* Вот тут сразу можно писать title вместо props.title */}
      <div className="pizza-block__selector">
        <ul>
          {props.types.map((type) => (
            <li
              key={type}
              className={activeType === type ? "active" : ""}
              onClick={() => {
                setActiveType(type); // 0 либо 1, тонкое, либо традиционное, activeType включает в себя 0 при изменении состоянии на 0, а type и есть 0
              }}
            >
              {typeNames[type]}
            </li>
            // "types": [0, 1]
            // <li key={type}>{type === 0 ? typeNames[0] : typeNames[1]}</li>
            // <li key={type}>{type === 0 ? "тонкое" : "традиционное"}</li>
          ))}
        </ul>
        <ul>
          {props.sizes.map((size, i) => (
            <li
              key={size}
              onClick={() => {
                setActiveSize(i);
              }}
              className={activeSize === i ? "active" : ""}
            >
              {size} см.
            </li>
            //    "sizes": [26, 30, 40], [26, 40]
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{`от ${props.price} ₽`}</div>
        <button
          className="button button--outline button--add"
          onClick={() => {
            onClickAdd();
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {getPizzaCount() > 0 && <i>{getPizzaCount()}</i>}
        </button>
      </div>
    </div>
  );
}

export default PizzaBlock;

// можно сделать вот так, чтобы внутри вызывать функцию, обрати внимание на фигурные скобки и return, а также где они используются
// обрати внимание на вызов функции, фигурные собки, JS код, return, круглые скобки - всё важно дружочек

/* <ul>
  {props.types.map((type) => {
    // ЛЮБОЙ JS КОД, например вызов функции:
    Proverka();
    return (
      <li
        key={type}
        className={activeType === type ? "active" : ""}
        onClick={() => {
          setActiveType(type);
        }}
      >
        {typeNames[type]}
      </li>
    );
  })}
</ul>; */
