import React from "react";

import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      {/*styles для инкапсулирования, каждый будет индивидуален и уникален, не будет конфликтов*/}
      <h1>
        <span>:((</span>
        <br />
        <h1>Ничего не найдено</h1>
      </h1>
      <p className={styles.description}>
        К сожалению, данная страница отсутствует в нашем магазине
      </p>
    </div>
  );
};

export default NotFoundBlock;
