function Categories({ categoryID, onClickCategory }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          // у каждого category в массиве есть свой index, не забывай бро
          <li
            key={categoryName} // нужно делать когда map, для оптимизации, чтобы реакту было легче понять, какой элемент
            // нужно изменить в списке, потом прочитать
            // в key = {i} - можно прокидывать индекс ТОЛЬКО ПРИ УСЛОВИИ, если СПИСОК СТАТИЧНЫЙ, то есть не будет меняться,
            // редактироваться ничего в этом списке не будет, удаляться не будет при каком-то условии и тому подобное.
            // то есть в key можно прокидывать index при условии если список статичный, а не динамичный.
            // если список динамичный и изменяется, то прокидывать index в key нельзя, нужно прокидывать что-то другое!!!
            className={categoryID === index ? "active" : ""} // принимает categoryID от родительского
            onClick={() => {
              onClickCategory(index); // передает в родительский компонент индекс
            }}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

// Я сделал вот так:

// import classNames from "classnames";
// import styles from "../_categories.module.scss";
// function Categories() {
//   let [activeCategory, setActiveCategory] = useState("Все");
//   return (
//     <div className={styles.categories}>
//       <ul>
//         <li
//           className={classNames({ [styles.active]: activeCategory === "Все" })}
//           onClick={() => {
//             setActiveCategory("Все");
//           }}
//         >
//           Все
//         </li>
//         <li
//           className={classNames({
//             [styles.active]: activeCategory === "Мясные",
//           })}
//           onClick={() => {
//             setActiveCategory("Мясные");
//           }}
//         >
//           Мясные
//         </li>
//         <li
//           className={classNames({
//             [styles.active]: activeCategory === "Вегетарианская",
//           })}
//           onClick={() => {
//             setActiveCategory("Вегетарианская");
//           }}
//         >
//           Вегетарианская
//         </li>
//         <li
//           className={classNames({
//             [styles.active]: activeCategory === "Гриль",
//           })}
//           onClick={() => {
//             setActiveCategory("Гриль");
//           }}
//         >
//           Гриль
//         </li>
//         <li
//           className={classNames({
//             [styles.active]: activeCategory === "Острые",
//           })}
//           onClick={() => {
//             setActiveCategory("Острые");
//           }}
//         >
//           Острые
//         </li>
//         <li
//           className={classNames({
//             [styles.active]: activeCategory === "Закрытые",
//           })}
//           onClick={() => {
//             setActiveCategory("Закрытые");
//           }}
//         >
//           Закрытые
//         </li>
//       </ul>
//     </div>
//   );
// }
