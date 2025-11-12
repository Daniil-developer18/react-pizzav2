import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import { setCurrentPage } from "../../redux/slices/filterSlice";
import { useDispatch} from "react-redux";
import { useAppSelector } from "../../redux/store";

const Pagination = () => {
  const currentPage = useAppSelector(
    (state) => state.filterReducer.currentPage
  );
  const dispatch = useDispatch();
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => {
        dispatch(setCurrentPage(event.selected + 1)); // event хранит в себе selected: 0 по индексу. Делаем +1 для перехода на следующую страницу.
      }} // жмякаем на 2 страницу, event.selected=1 + 1 = 2, передаем в number в родитель 2, там setCurrentPage(2), currentPage=2, грузит 2 страницу
      // у меня currentPage = 1 изначально. Когда я нажимаю на третью страниицу, то event.selected = 2, при onChangePage
      // event.selected = 2 + 1 = 3, передает 3 для изменения state, setCurrentPage(3), currentPage = 3 становится,
      // передается в запрос и выводится 3 страница с данными, потом нажимает на страницу 1,
      // event.selected = 0, в onChangePage event.selected = 0 + 1 = 1, передает 1 для изменения state,
      // currentPage = 1 становится 1, передается в запрос и выводится 1 страница с данными.
      pageRangeDisplayed={4} // ?
      pageCount={3} // Число сколько страниц. У нас 3. Но вообще backend может возвращать эту инфу и если бы Mockapi возвращал бы эту инфу, а не был худшим backend'ом, то мы бы ее сюда вставляли вместо 3 и при увеличении товара, наша переменная автоматом менялась бы.
      renderOnZeroPageCount={null} // ?
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;

// Эта пагинация худшая просто. хард код. лучше бы ее вообще не было.
