import './ConnectWallet.css'
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
				<div className={"connect-wallet-container"}>
					<div className={"serenium-logo-wallet"}/>
					<button className={"connect-button"} onClick={openModal}>
						<div className={"polkadot-logo-wallet"}/>
						<p className={"connect-text"}>Connect</p>
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