import { useEffect, useState } from 'react';
import PostCard from '../../components/layout/PostCard/PostCard';
import { useAlert, useApi } from '@gear-js/react-hooks';
import { ProgramMetadata } from '@gear-js/api';
import Reply from '../../components/layout/Reply/Reply'
import NavBar from "../../components/layout/NavBar/NavBar";
import './PostWithReplies.css'
import ReplyPhoto from "../../components/layout/Reply/ReplyPhoto/ReplyPhoto";
import {PROGRAMS} from "../../consts";

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
};

type Reply = {
	"postId": "0",
	"postOwner": "0xc2a1ec37748d434fc24687a656b6f8ac5ba8af088b4a62aeb82db75fd6dfa467",
	"content": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
	"numberOfLikes": "0",
	"numberOfReports": "0"
}

function PostWithReplies() {
	const { api } = useApi();
	const [threadState, setThreadState] = useState<ThreadState>();
	const alert = useAlert();

	type Reply = {
		postId: string,
		postOwner: string,
		content: string,
		numberOfLikes: number,
		numberOfReports: number
	}

	const metadata = ProgramMetadata.from(PROGRAMS.THREAD.META);

	const getState = () => {
		api.programState
			.read({ programId: `0x${PROGRAMS.THREAD.ID}`, payload: '' }, metadata)
			.then(result => {
				setThreadState(result.toJSON() as unknown as ThreadState);
				alert.success('Successful state');
			})
			.catch(({ message }: Error) => alert.error(message));
	};

	useEffect(() => {
		getState();
	}, []);
	return (
		<>
			<div className={"post-replies-container"}>
				<PostCard/>
				<div className={"replies-container"}>
					{threadState?.replies.map(replyHM => (
						<ReplyPhoto title={"Lorem ipsum"}/>
					))}
				</div>
				<div className={"cat-container"}>
					<img alt="." src={"../../assets/images/icons/cat_no_replies.svg"} id={"cat"}/>
					<h2 className={"gato-texto"}>There are no replies on this thread add yours</h2>
				</div>
			</div>
			<NavBar/>
		</>
	);
}

export default PostWithReplies;
export type {ThreadState};
