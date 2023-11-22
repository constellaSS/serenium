import { Route, Routes } from 'react-router-dom';
import { Home } from './home';
import { Main } from './main';
import PostWithReplies from "./PostWithReplies/PostWithReplies";
import PostImage from "./PostImage/PostImage";
import NewPost from "./NewPost/NewPost";

const routes = [{ path: '/', Page: Home },{ path: '/post', Page: PostWithReplies }, { path: '/full-screen-post', Page: PostImage }, { path: '/new-post', Page: NewPost}];

function Routing() {
  const getRoutes = () => routes.map(({ path, Page }) => <Route key={path} path={path} element={<Page />} />);

  return <Routes>{getRoutes()}</Routes>;
}

export { Routing };
