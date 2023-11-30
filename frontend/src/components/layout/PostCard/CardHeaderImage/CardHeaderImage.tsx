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
			</div>
			<div id={"type-section"} ></div>
		</div>
	)
}

export default CardHeaderImage;