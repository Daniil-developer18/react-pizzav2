import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Main from "./components/main-component/Main";
import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

const queryClient = new QueryClient();

function App() {
  const location = useLocation(); // useLocation - позволяет мне получить информацию о текущем положении в навигации, на какой странице я нахожусь, какие параметры этой страницы
  useLayoutEffect(() => {
    // useLayoutEffect - хук, который отрабатывает ПЕРЕД рендером компонента. То есть СНАЧАЛА scroll вверх, потом рендер компонента, не будет бага с тем, что компонент появился, а мы скроллим вверх
    // useEffect - хук, который отрабатывает ПОСЛЕ рендера компонента. То есть сначала происходит РЕНДЕР, только потом scroll вверх. Поэтому случается баг, рендер появился, потом мы идем навверх и происходит баг-искажение картинки-компонента
    window.scrollTo(0, 0);
  }, [location.pathname]);
  // console.log(location);
  return (
    <QueryClientProvider client={queryClient}>
      {/*чтобы работал react-query */}
      <Main />
    </QueryClientProvider>
  );
}

export default App;
