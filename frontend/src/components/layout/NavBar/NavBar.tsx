import {useState} from "react";
import CustomAlert from "../CustomAlert/CustomAlert";
import './navBar.css';

function NavBar() {
	const [showAlert, setShowAlert] = useState(false);

	const handleShowAlert = () => {
		setShowAlert(true);
	};

	return (
		<div className="navBar">
			<button type='button' id="navBtn1" className="navBarButton" onClick={() => {
				window.location.href = '/'
			}}/>
			<button type='button' onClick={handleShowAlert} id="navBtn3" className="navBarButton"/>
			<CustomAlert type={0} isOpen={showAlert} onClose={() => setShowAlert(false)}/>
			<button type='button' id="navBtn5" className="navBarButton"/>
		</div>
	)
}

export default NavBar;
