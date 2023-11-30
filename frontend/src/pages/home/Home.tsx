import './home.css'
import NavBar from "../../components/layout/NavBar/NavBar";
import PostFeed from "../PostFeed/PostFeed";
import Profile from "../Profile/Profile";

function Home() {
  return (
    <div className='homeScreen'>
      <Profile/>
      <NavBar/>
    </div>
  )
}

export { Home };
