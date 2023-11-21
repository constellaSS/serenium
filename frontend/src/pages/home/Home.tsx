import './home.css'
import NavBar from "../../components/layout/NavBar/NavBar";
import PostFeed from "../PostFeed/PostFeed";
import PostImage from "../PostImage/PostImage";

function Home() {
  return (
    <div className='homeScreen'>
      <PostImage/>
      <NavBar/>
    </div>
  )
}

export { Home };
