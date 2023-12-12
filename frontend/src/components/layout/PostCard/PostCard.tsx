import styles from './PostCard.module.css'
import {ProgramMetadata} from "@gear-js/api";
import {useEffect, useState} from "react";
import {useAlert, useApi} from "@gear-js/react-hooks";
import {PROGRAMS} from "consts";
import CardHeaderImage from "./CardHeaderImage/CardHeaderImage";

type ThreadState = {
	id: string;
	owner: string;
	threadType: string;
	title: string;
	content: string;
	photoUrl: string;
	replies: [string, Reply][];
	participants: [];
	state: string;
	distributedTokens: number;
}

type Reply = {
	"postId": "0",
	"postOwner": "0xc2a1ec37748d434fc24687a656b6f8ac5ba8af088b4a62aeb82db75fd6dfa467",
	"content": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
	"numberOfLikes": "0",
	"numberOfReports": "0"
}

function PostCard () {
	const {api} = useApi();
	const [threadState, setThreadState] = useState<ThreadState | undefined>(undefined);
	const alert = useAlert();
	const metadata = ProgramMetadata.from(PROGRAMS.THREAD.META);

	// useEffect hook to update the thread state
	useEffect(() => {
		const getState = () => {
			api?.programState
				.read({ programId: PROGRAMS.THREAD.ID, payload: '' }, metadata)
				.then(result => {
					setThreadState(result.toJSON() as unknown as ThreadState);
					alert.success('Successful state');
				})
				.catch(({ message }: Error) => alert.error(message));
		};
		getState();
	}, []);

	const compoundClassName = `${styles.cardPostAddButton} ${threadState?.state === 'Expired' ? styles.cardPostAddButtonBlocked : ''}`;

	return (
		<div className="postCard">
			{threadState?.photoUrl !== "" && <CardHeaderImage imgUrl={threadState?.photoUrl as string}/>}
			<div className={styles.postCardBody}>
				<div className={"post-card-info"} onClick={() => {
					window.location.href = '/post'
				}}>
					<h2 className={styles.postCardTitle}>{threadState?.title}</h2>
					<p className={styles.postCardContent}>{threadState?.content}</p>
				</div>
				<div className={styles.postCardButtonOutsideContainer}>
					<button className={compoundClassName}  type="button" onClick={() => {
						window.location.href = `/new-reply/:${threadState?.id}`
					}}/>
				</div>
			</div>
		</div>
	)
}

export default PostCard;