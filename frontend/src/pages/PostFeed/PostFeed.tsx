import PostCard from "../../components/layout/PostCard/PostCard";
import styles from './PostFeed.module.css'
import PostWithReplies from "../PostWithReplies/PostWithReplies";
import PostImage from "../PostImage/PostImage";
import NewPost from "../NewPost/NewPost";

const PostFeed = () => {
	return (
		<div className={styles.postFeedPage}>
			<div className={styles.postFeedContainer}>
				<PostImage/>
			</div>
		</div>
	)
}

export default PostFeed;