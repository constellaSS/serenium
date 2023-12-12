import styles from './Profile.module.css'
import {useAccount} from "@gear-js/react-hooks";
import {extractLast10Digits} from "../../utils/extract_from_string";
import {useState} from "react";
import {AccountsModal} from "../../components/layout/header/account/accounts-modal";

function Profile() {
	const { account, accounts } = useAccount();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className={styles.contentWrapper}>
			<div className={styles.user}>
				<div className={styles.userImage}/>
				<div className={styles.accountInfoContainer} onClick={openModal}>
					<div className={styles.polkadotLogo}/>
					<div className={styles.accountNameContainer}>
						<h2 className={styles.userName}>{account?.meta.name as string}</h2>
						<p className={styles.actorId}>...{extractLast10Digits(account?.decodedAddress as string)}</p>
					</div>
				</div>
			</div>
			{isModalOpen && <AccountsModal accounts={accounts} close={closeModal} />}
		</div>
	)
}

export default Profile;
