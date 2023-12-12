import PostCard from "../../components/layout/PostCard/PostCard";
import './PostFeed.css'
import PostWithReplies from "../PostWithReplies/PostWithReplies";

const PostFeed = () => {
	return (
		<div className={"post-feed-page"}>
			<div className={"post-feed-container"}>
				<PostWithReplies/>
			</div>
		</div>
	)
}

export default PostFeed;