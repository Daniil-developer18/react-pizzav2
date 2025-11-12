import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block" // Тогда стили станут как у пиццы-блоков и они будут с одинаковыми отступами и т.п. Стили у скелетона, как и у компонента
    speed={2}
    width={300}
    height={467.65}
    viewBox="0 0 285 467.65"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="135" cy="125" r="125" />
    <rect x="0" y="300" rx="10" ry="10" width="279" height="88" />
    <rect x="0" y="418" rx="10" ry="10" width="90" height="27" />
    <rect x="0" y="258" rx="10" ry="10" width="279" height="27" />
    <rect x="128" y="408" rx="30" ry="30" width="152" height="46" />
  </ContentLoader>
);

export default Skeleton;
