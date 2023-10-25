import {useState} from "react"
import {GearApi, GearKeyring, ProgramMetadata} from "@gear-js/api";
import CustomAlert from "../CustomAlert/CustomAlert";
import './navBar.css'
import {useAccount, useApi} from "@gear-js/react-hooks";

function NavBar() {
	const [showAlert, setShowAlert] = useState(false);

	const handleShowAlert = () => {
		setShowAlert(true);
	};

	const handleConfirm = async (input1: string, input2: string) => {
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
