import styles from './PostImage.module.css'

function PostImage() {
	return (
		<div className={styles.fullScreenPostPage}>
			<div className={styles.contentWrapper}>
				<div className={styles.textPost}>
					<h2 className={styles.postCardTile}>Titulo</h2>
				</div>
				<div className={styles.postCardButtonOutsideContainer}>
					<div className={styles.postCardButtonInnerContainer}>
						<button className={`${styles.postCardActionButton} ${styles.postCardSave}`} type="button"/>
						<button className={`${styles.postCardActionButton} ${styles.postCardShare}`} type="button"/>
						<button className={`${styles.postCardActionButton} ${styles.postCardBan}`} type="button"/>
					</div>
					<button
						className={`${styles.postCardActionButton} ${styles.cardPostAddButton}`} type="button"/>
				</div>
			</div>
		</div>
	)
}

export default PostImage;
