import PostCard from "../../components/layout/PostCard/PostCard";
import './PostFeed.css'
import PostWithReplies from "../PostWithReplies/PostWithReplies";
import PostImage from "../PostImage/PostImage";

const PostFeed = () => {
	return (
		<div className={"post-feed-page"}>
			<div className={"post-feed-container"}>
				<PostImage/>
			</div>
		</div>
	)
}

export default PostFeed;