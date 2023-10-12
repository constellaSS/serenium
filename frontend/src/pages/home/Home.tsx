import './home.css'
import NavBar from "../../components/layout/NavBar/NavBar";
import PostContainer from "../../components/layout/PostContainer/PostContainer";

function Home() {
  return (
    <div className='homeScreen'>
      <PostContainer/>
      <NavBar />
    </div>
  )
}

export { Home };
