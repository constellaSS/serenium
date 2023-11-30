import { useEffect, useState } from 'react';
import PostCard from '../../components/layout/PostCard/PostCard';
import { useAlert, useApi } from '@gear-js/react-hooks';
import { ProgramMetadata } from '@gear-js/api';
import Reply from '../../components/layout/Reply/Reply'
import NavBar from "../../components/layout/NavBar/NavBar";
import './PostWithReplies.css'
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
	id: string,
	owner: string,
	title: string,
	content: string,
	likes: number,
	reports: number
}

function PostWithReplies() {
	const { api } = useApi();
	const [threadState, setThreadState] = useState<ThreadState>();
	const alert = useAlert();

	const metadata = ProgramMetadata.from(PROGRAMS.THREAD.META);

	const getState = () => {
		api.programState
			.read({ programId: PROGRAMS.THREAD.ID, payload: '' }, metadata)
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
					{threadState?.replies.map(([_, reply]) => (
						<Reply title={reply.title} content={reply.content}/>
					))}
				</div>
			</div>
			<NavBar/>
		</>
	);
}

export default PostWithReplies;
export type {ThreadState};
