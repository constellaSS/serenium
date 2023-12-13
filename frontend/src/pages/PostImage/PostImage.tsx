import styles from './PostImage.module.css'
import {extractLast10Digits} from "../../utils/extract_from_string";
import {useAccount} from "@gear-js/react-hooks";
import {useState} from "react";

function PostImage() {
	const { account, accounts } = useAccount();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className={styles.fullScreenPostPage}>
			<div className={styles.contentWrapper}>
				<div className={styles.userInfo}>
					<div className={styles.polkadotLogo}/>
					<div className={styles.accountNameContainer}>
						<h2 className={styles.userName}>{account?.meta.name as string}</h2>
						<p className={styles.actorId}>...{extractLast10Digits(account?.decodedAddress as string)}</p>
					</div>
				</div>
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
