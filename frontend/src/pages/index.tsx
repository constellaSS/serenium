import { Route, Routes } from 'react-router-dom';
import { Home } from './home';
import { Main } from './main';
import PostWithReplies from "./PostWithReplies/PostWithReplies";
import PostImage from "./PostImage/PostImage";
import NewPost from "./NewPost/NewPost";
import {ApiLoader} from "../components";
import Profile from "./Profile/Profile";

const routes = [{ path: '/', element: <Home/> },{ path: '/post', element: <PostWithReplies/> }, { path: '/full-screen-post', element: <PostImage/> }, { path: '/new-post', element: <NewPost isReply={false}/>}, { path: '/new-reply', element: <NewPost isReply={true}/>}, { path: '/profile', element: <Profile/>}]

function Routing() {
  const getRoutes = () => routes.map(({ path, element }) => <Route key={path} path={path} element={element} />);

  return <Routes>{getRoutes()}</Routes>;
}

export { Routing };
