import './home.css'
import NavBar from "../../components/layout/NavBar/NavBar";
import PostFeed from "../PostFeed/PostFeed";
import Profile from "../Profile/Profile";
import PostWithReplies from "../PostWithReplies/PostWithReplies";

function Home() {
  return (
    <div className='homeScreen'>
        <PostWithReplies/>
        <NavBar/>
    </div>
  )
}

export { Home };
