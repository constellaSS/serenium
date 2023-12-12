import {useState} from "react";
import './ReplyPhoto.css'

interface Props {
	title: string
}

const ReplyPhoto = ({title}: Props) => {
	const [photo, setPhoto] = useState();

	return (
		<div className={"reply-photo-container"}>
			<div className={"title-area"}>
				<h2 className={"title"}>{title}</h2>
			</div>
			<div className={"photo-container"}></div>
			<div className={"reply-photo-icon-container"}></div>
		</div>
	)
}

export default ReplyPhoto;