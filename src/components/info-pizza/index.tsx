import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "../pizza-block/Skeleton";
import styles from "./InfoPizza.module.scss"; // в src declaration.d.ts
import { Link } from "react-router-dom";
import { PizzaInfo } from "../../types/pizza";

// import { useEffect, useState } from "react";

const InfoPizza = () => {
  const { id } = useParams<string>();

  //   const [data, setData] = useState(null);
  //   const [error, setError] = useState(null);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(
  //           // если юзаем async await, то в переменную кидай это бро const response, а то иначе не сможешь setData сделать, а
  //           // будешь делать .then((response)=>response.data), а так нет смысла так как я использую конструкцию async await, можно просто
  //           // сделать переменную и потом просто setData
  //           `https://68d42667214be68f8c688e15.mockapi.io/items/${id}`
  //         );
  //         setData(response.data);
  //       } catch (error) {
  //         setError(error);
  //       }
  //     };
  //     fetchData();
  //   }, []); // ЗАВИСИМОСТИ!!!

  const { isPending, error, data } = useQuery<PizzaInfo>({
    queryKey: [id],
    queryFn: () =>
      axios
        .get(`https://68d42667214be68f8c688e15.mockapi.io/items/${id}`, {})
        .then((response) => response.data),
  });

  // console.log(id);
  //console.log(data);
  return (
    <>
      {error && (
        <div className={styles.error}>
          <span>Ошибка:</span> ${error.message}
        </div>
      )}
      {isPending &&
        [...new Array(1)].map((_, index) => (
          <div className={styles.skeleton}>
            <Skeleton key={index} />
          </div>
        ))}
      {data && (
        <div className={styles.info}>
          <p className={styles.title}>Название пиццы: {data.title}</p>
          <img className={styles.image} src={data.imageUrl} alt="Pizza" />
          <p className={styles.price}>Цена: {data.price} ₽</p>
          <Link to="/" className={styles.back}>
            Вернуться назад
          </Link>
        </div>
      )}
    </>
  );
};

export default InfoPizza;
