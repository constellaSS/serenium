import './Profile.css'
import {useAccount} from "@gear-js/react-hooks";
import {extractLast10Digits} from "../../utils/extract_from_string";

function Profile() {
	const accounts = useAccount();

	return (
		<div className={"contentWrapper"}>
			<div className={"user"}>
				<div className={"user-image"}/>
				<div className={"account-info-container"}>
					<div className={"polkadot-logo"}/>
					<div className={"account-name-container"}>
						<h2 className={"user-name"}>{accounts.account?.meta.name as string}</h2>
						<p className={"actor-id"}>...{extractLast10Digits(accounts.account?.decodedAddress as string)}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile;
