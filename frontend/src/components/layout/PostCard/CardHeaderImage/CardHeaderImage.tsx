import './CardHeaderImage.css'
interface CardHeaderImageProps {
	imgUrl: string
}

const CardHeaderImage = ({imgUrl}: CardHeaderImageProps) => {
	return (
		<div className={"image-first-container"} id={"card-header-image-container"} onClick={() => {
			window.location.href = '/full-screen-post'
		}}>
			<div className={"image-second-container"}>
				<img alt={"post-picture"} src={imgUrl} id={"post-photo"}/>
				<img alt="." src={"../../../../assets/images/icons/post_curves.svg"} id={"foreground-image"}/>
				<img alt="." src={"../../../../assets/images/icons/question_post.svg"} id={"foreground-image1"}/>
			</div>
			<div id={"type-section"} ></div>
		</div>
	)
}

export default CardHeaderImage;