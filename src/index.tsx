
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // React Router в index.js
import { store } from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root")!); // в typeScript document.getElementById("root") - подчеркивается красным, потому что
// это типизация DOM-элементов, TS не уверен, что элемент с id="root" точно существует, типа вдруг его нет в HTML, ТИП "root" dom-элемента имеет: HTMLElement | null ,
// можно решить эту проблему добавив ! , как я сделал, это non-null assertion operator (!), я по сути говорю TS: Я точно знаю, что это не null. Поверь мне.
// То есть я убеждаю TS, что там точно HTMLElement, никакого null там не будет, можно сделать условие на root, если не найдется, то сформировать ошибку, так тоже
// будет работать

root.render(
  <Provider store={store}>
    {/*Дружит redux-toolkit с react js с помощью react-redux Provider */}
    <BrowserRouter>
      {/*чтоб работал react-router */}
      <App />
    </BrowserRouter>
  </Provider>
);
