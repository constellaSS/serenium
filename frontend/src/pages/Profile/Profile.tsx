import './Profile.css'
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
		<div className={"contentWrapper"}>
			<div className={"user"}>
				<div className={"user-image"}/>
				<div className={"account-info-container"} onClick={openModal}>
					<div className={"polkadot-logo"}/>
					<div className={"account-name-container"}>
						<h2 className={"user-name"}>{account?.meta.name as string}</h2>
						<p className={"actor-id"}>...{extractLast10Digits(account?.decodedAddress as string)}</p>
					</div>
				</div>
			</div>
			{isModalOpen && <AccountsModal accounts={accounts} close={closeModal} />}
		</div>
	)
}

export default Profile;
