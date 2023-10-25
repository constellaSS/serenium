import React, {useState} from 'react';
import "./CustomAlert.css"
import {useAccount, useAlert, useApi} from "@gear-js/react-hooks";
import {CreateType, ProgramMetadata, getTypeAndPayload} from "@gear-js/api";
import {web3FromSource} from "@polkadot/extension-dapp";


interface CustomAlertProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (input1: string, input2: string) => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({isOpen, onClose, onConfirm}) => {
	const alert = useAlert();
	const {accounts, account} = useAccount();
	const {api} = useApi();
	const [inputValue1, setInputValue1] = useState('');
	const [inputValue2, setInputValue2] = useState('');

	// TODO: Get these variables from env file
	const programIDThread = "0x98c4ec4c91b2831a97099d4c25f78857c2f7dc8127c1fcffc74d433ff59a15d4";
	const meta = "0001000100000000000104000000010900000000000000010a000000b10c40000808696f18496e69744654000004013466745f70726f6772616d5f696404011c4163746f72496400000410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004000801205b75383b2033325d000008000003200000000c000c0000050300100808696f30546872656164416374696f6e000110244e65775468726561640400140128496e697454687265616400000024456e64546872656164000100204164645265706c7904001c012c5468726561645265706c79000200244c696b655265706c7904002001107531323800030000140808696f28496e697454687265616400001001086964180118537472696e670001146f776e6572180118537472696e6700012c7468726561645f74797065180118537472696e6700011c636f6e74656e74180118537472696e6700001800000502001c0808696f2c5468726561645265706c79000014011c706f73745f696420011075313238000128706f73745f6f776e657204011c4163746f72496400011c636f6e74656e74180118537472696e6700013c6e756d6265725f6f665f6c696b6573200110753132380001446e756d6265725f6f665f7265706f727473200110753132380000200000050700240808696f2c5468726561644576656e7400010c2c546872656164456e646564000000285265706c794164646564000100285265706c794c696b656400020000280808696f20496f54687265616400002001086964180118537472696e670001146f776e6572180118537472696e6700012c7468726561645f74797065180118537472696e6700011c636f6e74656e74180118537472696e6700011c7265706c6965732c016c5665633c284163746f7249642c205468726561645265706c79293e0001307061727469636970616e74733401505665633c284163746f7249642c2075313238293e00011473746174653c012c546872656164537461746500014864697374726962757465645f746f6b656e732001107531323800002c00000230003000000408041c0034000002380038000004080420003c0808696f2c5468726561645374617465000108184163746976650000001c4578706972656400010000";

	const metadata = ProgramMetadata.from(meta);

	const message: any = {
		destination: programIDThread,
		payload: {
			"newThread": {
				"id": "fdfddf", // generate id
				"owner": account?.address,
				"threadType": "question", // question or challenge
				"content": inputValue2
			}
		},
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
			const transferExtrinsic = await api.message.send(message, metadata);

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
							onClose();
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

	const handleConfirm = () => {
		onConfirm(inputValue1, inputValue2);
		onClose();
	};

	return isOpen ? (
		<div className="customAlert">
			<div className="customAlertContent">
				<h2>New Post</h2>
				<input
					type="text"
					placeholder="Title"
					value={inputValue1}
					onChange={(e) => setInputValue1(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Content"
					value={inputValue2}
					onChange={(e) => setInputValue2(e.target.value)}
				/>
				<button type="button" onClick={signer}>OK</button>
				<button type="button" onClick={onClose}>Cancel</button>
			</div>
		</div>
	) : null;
};

// eslint-disable-next-line import/no-default-export
export default CustomAlert;
