import {useState} from "react";
import './navBar.css';

function NavBar() {
	return (
		<div className="navBar">
			<button type='button' id="navBtn1" className="navBarButton" onClick={() => {
				window.location.href = '/'
			}}/>
			<button type='button' onClick={() => {
				window.location.href = '/new-post'
			}} id="navBtn3" className="navBarButton"/>
			<button type='button' id="navBtn5" className="navBarButton"/>
		</div>
	)
}

export default NavBar;
