import './PostImage.css'

function PostImage() {
	return (
		<div className={"full-screen-post-page"}>
			<div className={"contentWrapper"}>
				<div className={"Text"}>
					<h2 className="postCardTitle">Titulo</h2>
				</div>
				<div className="postCardButtonOutsideContainer">
					<div className="postCardButtonInerContainer">
						<button id="postCardSave" className="postCardActionButton" type="button"/>
						<button id="postCardShare" className="postCardActionButton" type="button"/>
						<button id="postCardBan" className="postCardActionButton" type="button"/>
					</div>
					<button id="cardPostAddButton" className="postCardActionButton" type="button"/>
				</div>
			</div>
		</div>
	)
}

export default PostImage;
