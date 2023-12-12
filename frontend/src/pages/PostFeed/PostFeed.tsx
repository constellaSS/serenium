import styles from  './PostFeed.module.css'
import PostCard from "../../components/PostCard/PostCard";

export default function PostFeed() {
	return(
		<main className={styles.postFeedPage}>
			<div className={styles.postFeedContainer}>
				<PostCard/>
			</div>
		</main>
	)
}