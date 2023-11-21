import './PostCard.css'
import CardHeaderQuestion from "./CardHeaderQuestion";
import CardHeaderChallenge from "./CardHeaderChallenge";
import {ProgramMetadata} from "@gear-js/api";
import {useEffect, useState} from "react";
import CustomAlert from "../CustomAlert/CustomAlert";
import Tag from "../Tag/Tag";
import Reply from "../Reply/Reply";
import {useAlert, useApi} from "@gear-js/react-hooks";

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
	const [showAlert, setShowAlert] = useState(false);
	const [postExpired, setPostExpired] = useState(true);

	// TODO: Get these variables from env file
	const programIDThread = "0x4eabc8f612ac98b4c5ff37315d31dd61c5f9288038d3d041e321973c70712693";

	const meta = "00010001000000000001040000000108000000000000000109000000350d40000808696f18496e69744654000004013466745f70726f6772616d5f696404011c4163746f72496400000410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004000801205b75383b2033325d000008000003200000000c000c0000050300100808696f30546872656164416374696f6e000110244e65775468726561640400140128496e697454687265616400000024456e64546872656164000100204164645265706c790400180118537472696e67000200244c696b655265706c7904001c01107531323800030000140808696f28496e697454687265616400001001086964180118537472696e6700012c7468726561645f74797065180118537472696e670001147469746c65180118537472696e6700011c636f6e74656e74180118537472696e6700001800000502001c0000050700200808696f2c5468726561644576656e74000110404e6577546872656164437265617465640000002c546872656164456e646564000100285265706c794164646564000200285265706c794c696b656400030000240808696f20496f54687265616400002401086964180118537472696e670001146f776e657204011c4163746f72496400012c7468726561645f74797065180118537472696e670001147469746c65180118537472696e6700011c636f6e74656e74180118537472696e6700011c7265706c69657328016c5665633c284163746f7249642c205468726561645265706c79293e0001307061727469636970616e74733401505665633c284163746f7249642c2075313238293e00011473746174653c012c546872656164537461746500014864697374726962757465645f746f6b656e731c0110753132380000280000022c002c00000408043000300808696f2c5468726561645265706c79000014011c706f73745f69641c011075313238000128706f73745f6f776e657204011c4163746f72496400011c636f6e74656e74180118537472696e6700013c6e756d6265725f6f665f6c696b65731c0110753132380001446e756d6265725f6f665f7265706f7274731c01107531323800003400000238003800000408041c003c0808696f2c5468726561645374617465000108184163746976650000001c4578706972656400010000";

	const metadata = ProgramMetadata.from(meta);

	const getState = () => {
		api.programState
			.read({ programId: programIDThread, payload: '' }, metadata)
			.then(result => {
				setThreadState(result.toJSON() as unknown as ThreadState);
				alert.success('Successful state');
			})
			.catch(({ message }: Error) => alert.error(message));
	};

	useEffect(() => {
		getState();
	}, []);

	const handleShowAlert = () => {
		setShowAlert(true);
	};

	const cardPostAddButton = 'cardPostAddButton';
	const cardPostAddButtonBlocked = postExpired ? 'cardPostAddButtonBlocked' : '';
	const compoundClassName = `${cardPostAddButton} ${cardPostAddButtonBlocked}`;

	return (
		<div className="postCard" onClick={() => {
			window.location.href = '/full-post'
		}}>
			{threadState?.threadType ? (
				<CardHeaderQuestion/>
			) : (
				<CardHeaderChallenge/>
			)}
			<div className={"post-card-body"}>
				<div className={"post-card-info"}>
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
						<CustomAlert type={1} isOpen={showAlert} onClose={() => setShowAlert(false)}/>
						<button id="postCardBan" className="postCardActionButton" type="button"/>
					</div>
					<button className={compoundClassName}  type="button" onClick={handleShowAlert}/>
				</div>
			</div>
		</div>
	)
}

export default PostCard;