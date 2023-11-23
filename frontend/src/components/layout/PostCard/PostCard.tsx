import './PostCard.css'
import CardHeaderQuestion from "./CardHeaderQuestion";
import CardHeaderChallenge from "./CardHeaderChallenge";
import {ProgramMetadata} from "@gear-js/api";
import {useEffect, useState} from "react";
import Tag from "../Tag/Tag";
import Reply from "../Reply/Reply";
import {useAlert, useApi} from "@gear-js/react-hooks";
import {THREAD_PROGRAM_ID, THREAD_PROGRAM_METADATA} from "../../../ContractVariables";

interface PostCardProps {
	title: string;
	content: string;
	type: number;
	threadState?: ThreadState | undefined
}

type ThreadState = {
	id: string;
	owner: string;
	threadType: string;
	title: string;
	content: string;
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
	const [threadState, setThreadState] = useState<ThreadState>();
	const alert = useAlert();
	const [postExpired, setPostExpired] = useState(true);

	const metadata = ProgramMetadata.from(THREAD_PROGRAM_METADATA);

	const getState = () => {
		api.programState
			.read({ programId: THREAD_PROGRAM_ID, payload: '' }, metadata)
			.then(result => {
				setThreadState(result.toJSON() as unknown as ThreadState);
				alert.success('Successful state');
			})
			.catch(({ message }: Error) => alert.error(message));
	};

	// useEffect hook to update the thread state
	useEffect(() => {
		getState();
	}, []);

	const compoundClassName = `${threadState?.state === 'Expired' ? 'cardPostAddButtonBlocked' : 'cardPostAddButton'}`;

	return (
		<div className="postCard">
			{threadState?.threadType ? (
				<CardHeaderQuestion/>
			) : (
				<CardHeaderChallenge/>
			)}
			<div className={"post-card-body"}>
				<div className={"post-card-info"} onClick={() => {
					window.location.href = '/post'
				}}>
					<h2 className="postCardTitle">{threadState?.title}</h2>
					<p className="postCardContent">{threadState?.content}</p>
				</div>
				<div className={"tags-container"}>
					<Tag name={"lorem"}/>
					<Tag name={"ipsum"}/>
				</div>
				<div className="postCardButtonOutsideContainer">
					<div className="postCardButtonInerContainer">
						<button id="postCardSave" className="postCardActionButton" type="button"/>
						<button id="postCardShare" className="postCardActionButton" type="button"/>
						<button id="postCardBan" className="postCardActionButton" type="button"/>
					</div>
					<button className={compoundClassName}  type="button"/>
				</div>
			</div>
		</div>
	)
}

export default PostCard;