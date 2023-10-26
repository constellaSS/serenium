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

	return (
		<div className="navBar">
			<button type='button' id="navBtn1" className="navBarButton"/>
			<button type='button' id="navBtn2" className="navBarButton"/>
			<button type='button' onClick={handleShowAlert} id="navBtn3" className="navBarButton"/>
			<CustomAlert type={0} isOpen={showAlert} onClose={() => setShowAlert(false)}/>
			<button type='button' id="navBtn4" className="navBarButton"/>
			<button type='button' id="navBtn5" className="navBarButton"/>
		</div>
	)

}

export default NavBar;
