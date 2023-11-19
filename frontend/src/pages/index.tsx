import { Route, Routes } from 'react-router-dom';
import { Home } from './home';
import { Main } from './main';
import PostWithReplies from "./PostWithReplies/PostWithReplies";

const routes = [{ path: '/', Page: Home },{ path: '/full-post', Page: PostWithReplies }];

function Routing() {
  const getRoutes = () => routes.map(({ path, Page }) => <Route key={path} path={path} element={<Page />} />);

  return <Routes>{getRoutes()}</Routes>;
}

export { Routing };
