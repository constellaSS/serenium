import './home.css'
import NavBar from "../../components/layout/NavBar/NavBar";
import PostContainer from "../../components/layout/PostContainer/PostContainer";
import PostFeed from "../PostFeed/PostFeed";

function Home() {
  return (
    <div className='homeScreen'>
      <PostFeed/>
      <NavBar/>
    </div>
  )
}

export { Home };
