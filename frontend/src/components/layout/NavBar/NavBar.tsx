import {useState} from "react"
import {GearApi, GearKeyring} from "@gear-js/api";
import CustomAlert from "../CustomAlert/CustomAlert";
import './navBar.css'

const submitContract = async function (content: string) {
	const gearApi = await GearApi.create({
		providerAddress: 'wss://vit.vara-network.io',
	});
	const keyring = await GearKeyring.fromSuri('//Alice');

	try {
		const response = await fetch('./../../../../../smart_contracts/thread/target/wasm32-unknown-unknown/release/thread.wasm');
		if (!response.ok) {
			throw new Error("Failed to fetch the file.");
		}

		const arrayBuffer = await response.arrayBuffer();
		const code = new Uint8Array(arrayBuffer);
		const payload = {
			"id": "1",
			"owner": "100",
			"postType": "Challenge",
			"content": content,
			"replies": "sdsfdsfdsf",
			"state": "Active"
		}

		const program = {
			code,
			gasLimit: 1000000,
			value: 1000000000000000,
			initPayload: payload,
		};

		try {
			const {programId, codeId, salt, extrinsic} = gearApi.program.upload(
				program
			);
			try {
				await extrinsic.signAndSend(keyring, (event: { toHuman: () => any; }) => {
					console.log(event.toHuman());
				});
			} catch (error) {
				// @ts-ignore
				console.error(`${error.name}: ${error.message}`);
			}
		} catch (error) {
			// @ts-ignore
			console.error(`${error.name}: ${error.message}`);
		}
	} catch (error) {
		// Handle file loading error
		// @ts-ignore
		console.error(`${error.name}: ${error.message}`);
	}
}

function createPost() {

}


function NavBar() {
	const [showAlert, setShowAlert] = useState(false);

	const handleShowAlert = () => {
		setShowAlert(true);
	};

	const handleConfirm = async (input1: string, input2: string) => {
		await submitContract(input2)
		console.log('Input 1:', input1);
		console.log('Input 2:', input2);
	};
	return (
		<div className="navBar">
			<button type='button' id="navBtn1" className="navBarButton"/>
			<button type='button' id="navBtn2" className="navBarButton"/>
			<button type='button' onClick={handleShowAlert} id="navBtn3" className="navBarButton"/>
			<CustomAlert isOpen={showAlert} onClose={() => setShowAlert(false)} onConfirm={handleConfirm}/>
			<button type='button' id="navBtn4" className="navBarButton"/>
			<button type='button' id="navBtn5" className="navBarButton"/>
		</div>
	)

}

export default NavBar;
