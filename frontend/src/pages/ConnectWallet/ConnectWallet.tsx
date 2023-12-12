import styles from './ConnectWallet.module.css'
import {useState} from "react";
import {useAccount} from "@gear-js/react-hooks";
import {AccountsModal} from "../../components/layout/header/account/accounts-modal";
const ConnectWallet = () => {
	const { account, accounts } = useAccount();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const renderConnectWallet = () => {
		if (!account) {
			return(
				<div className={styles.connectWalletContainer}>
					<div className={styles.sereniumLogoWallet}/>
					<button className={styles.connectButton} onClick={openModal}>
						<div className={styles.polkadotLogoWallet}/>
						<p className={styles.connectText}>Connect</p>
					</button>
				</div>
			)
		} else {
			window.location.href = '/home';
		}
	}

	return(
		<>
			{renderConnectWallet()}
			{isModalOpen && <AccountsModal accounts={accounts} close={closeModal} />}
		</>
	)
}

export default ConnectWallet;