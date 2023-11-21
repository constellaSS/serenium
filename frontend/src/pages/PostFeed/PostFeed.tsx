import PostCard from "../../components/layout/PostCard/PostCard";
import './PostFeed.css'

const PostFeed = () => {
	return (
		<div className={"post-feed-page"}>
			<div className={"post-feed-container"}>
				<PostCard/>
			</div>
		</div>
	)
}

export default PostFeed;