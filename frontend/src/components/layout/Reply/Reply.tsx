import styles from './Reply.module.css'
import {ProgramMetadata} from "@gear-js/api";
import {useAccount, useAlert, useApi} from "@gear-js/react-hooks";
import {web3FromSource} from "@polkadot/extension-dapp";
import {PROGRAMS} from "../../../consts";

interface ReplyPreviewProps {
	title: string,
	content: string,
	id: string,
	likes: number
}

function Reply ({title, content, id, likes}: ReplyPreviewProps) {
	const alert = useAlert();
	const {accounts, account} = useAccount();
	const {api} = useApi();

	const metadata = ProgramMetadata.from(PROGRAMS.THREAD.META);

	const payload = {
		likeReply: [
			1,
			id
		]
	}

	const likeMessage: any = {
		destination: PROGRAMS.THREAD.ID,
		payload,
		gasLimit: 899819245,
		value: 0,
	}

	const signer = async () => {
		const localaccount = account?.address;
		const isVisibleAccount = accounts.some(
			(visibleAccount) => visibleAccount.address === localaccount
		);

		if (isVisibleAccount) {
			// Create a message extrinsic
			const transferExtrinsic = await api.message.send(likeMessage, metadata);

			const injector = await web3FromSource(accounts[0].meta.source);

			transferExtrinsic
				.signAndSend(
					accounts[0].address,
					{signer: injector.signer},
					({status}) => {
						if (status.isInBlock) {
							console.log(
								`Completed at block hash #${status.asInBlock.toString()}`
							);
							alert.success(`Block hash #${status.asInBlock.toString()}`);
						} else {
							console.log(`Current status: ${status.type}`);
							if (status.type === "Finalized") {
								alert.success(status.type);
							}
						}
					}
				)
				.catch((error: any) => {
					console.log(":( transaction failed", error);
				});
		} else {
			alert.error("Account not available to sign");
		}
	};

	return (
		<div className={styles.replyCard}>
			<div className={styles.replyCardContent}>
				<h2 className={styles.replyTitle}>{title}</h2>
				<p className={styles.replyContent}>{content}</p>
			</div>
			<button className={styles.replyCardLikeButton} onClick={signer}></button>
			<div className={styles.replyIconContainer}>
				<div className={styles.replyIcon}></div>
			</div>
		</div>
	)
}

export default Reply;