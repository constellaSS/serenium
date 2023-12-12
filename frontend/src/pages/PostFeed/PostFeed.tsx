import PostCard from "../../components/layout/PostCard/PostCard";
import './PostFeed.css'
import PostWithReplies from "../PostWithReplies/PostWithReplies";
import PostImage from "../PostImage/PostImage";
import NewPost from "../NewPost/NewPost";

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