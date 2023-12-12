import { Route, Routes } from 'react-router-dom';
import { Home } from './home';
import PostWithReplies from "./PostWithReplies/PostWithReplies";
import NewPost from "./NewPost/NewPost";
import Profile from "./Profile/Profile";
import ConnectWallet from "./ConnectWallet/ConnectWallet";

const routes = [{ path: '/', element: <ConnectWallet/>} ,{ path: '/home', element: <Home/> },{ path: '/post', element: <PostWithReplies/> }, { path: '/new-post', element: <NewPost isReply={false}/>}, { path: '/new-reply/:postId', element: <NewPost isReply={true}/>}, { path: '/profile', element: <Profile/>}]

function Routing() {
  const getRoutes = () => routes.map(({ path, element }) => <Route key={path} path={path} element={element} />);

  return <Routes>{getRoutes()}</Routes>;
}

export { Routing };