import NavBar from "../../components/layout/NavBar/NavBar";
import './NewPost.css'

const NewPost = () => {
	return (
		<>
			<div className={"new-post-container"}>
				<form className={"form-container"}>
					<div id={"upper-section"}>
						<input className={"new-post-input"} id={"post-title"} type={"text"} name={"post-title"} placeholder={"Title"} required={true}/>
						<button id={"add-tags-btn"}>Add Tags</button>
						<textarea name={"content"} placeholder={"Content (optional)"} className={"new-post-input"}/>
					</div>
					<div id={"lower-section"}>
						<input type={"file"} name={"image"}/>
						<button type={"submit"}>
							<p>Publish<span className={"add-post-svg"}></span></p>
						</button>
					</div>
				</form>
			</div>
			<NavBar/>
		</>
	)
}

export default NewPost;