import NavBar from "../../components/layout/NavBar/NavBar";
import './NewPost.css'
import {useState} from "react";

const NewPost = () => {
	const [selectedImg, setSelectedImg] = useState<File | null>(null);

	const handleImgChange = (e: any) => {
		const imgFile = e.target.files[0];
		if (imgFile && imgFile.type.startsWith('image/')) {
			setSelectedImg(imgFile);
		} else {
			setSelectedImg(null);
		}
	}

	return (
		<>
			<div className={"new-post-container"}>
				<form className={"form-container"}>
					<div id={"upper-section"}>
						<input className={"new-post-input"} id={"post-title"} type={"text"} name={"post-title"} placeholder={"Title"} required={true}/>
						<button id={"add-tags-btn"}>Add Tags</button>
						<textarea name={"content"} placeholder={"Content (optional)"} id={"content-input"} className={"new-post-input"}/>
					</div>
					<div id={"lower-section"}>
						<div className={"photo-input-container"}>
							<input type={"file"} id={"photo-input"} name={"image"} onChange={handleImgChange}/>
							<label htmlFor={"photo-input"} className={"photo-label"}>
								<div id={"photo-upload-icon"}></div>
							</label>
							{selectedImg && <p>{selectedImg.name}</p>}
						</div>
						<button id={"publish-post-btn"} type={"submit"}>
							<p className={"publish-post-btn-text"}>Publish</p>
							<div className={"add-post-svg"}></div>
						</button>
					</div>
				</form>
			</div>
			<NavBar/>
		</>
	)
}

export default NewPost;