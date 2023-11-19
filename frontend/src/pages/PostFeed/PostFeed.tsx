import PostCard from "../../components/layout/PostCard/PostCard";
import './PostFeed.css'

const PostFeed = () => {
	return (
		<div className={"post-feed"}>
			<PostCard title={"title 1"} content={"content 1"} type={0}/>
			<PostCard title={"title 2"} content={"content 2"} type={1}/>
			<PostCard title={"title 3"} content={"content 3"} type={0}/>
		</div>
	)
}

export default PostFeed;