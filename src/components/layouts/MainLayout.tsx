import { Outlet } from "react-router-dom";
import Header from "../header";
const MainLayout = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;

// Outlet используется для рендеринга дочерних маршрутов, нужен, когда есть вложенные маршруты, один маршрут внутри другого
// Наши Home, /cart, /pizza/:id теперь внутри общего макета MainLayout(создал тут, использую в Main.jsx, оборачиваю <Route></Route> всё, что является дочерним)
// внутри роута, которым обернул дочерние прокидываю MainLayout, теперь Header всегда будет, какой бы URL не был, а <Outlet /> будет динамичным и меняться
// В зависимости от URL, то есть тело сайта будет изменяться дочерними компонентами
