import cartEmptyImg from "../assets/img/empty-cart.png";
import { useNavigate } from "react-router-dom";

const CartEmpty = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="content">
        <div className="cart cart--empty">
          <h2>
            Корзина пустая <span>😕</span>
          </h2>
          <p>
            Вероятней всего, вы не заказывали ещё пиццу.
            <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
          </p>
          <img src={cartEmptyImg} alt="Empty cart" />
          <button onClick={() => navigate(-1)} className="button button--black">
            <span>Вернуться назад</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CartEmpty;
