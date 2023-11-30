import './CardHeaderImage.css'
interface CardHeaderImageProps {
	imgUrl: string
}

const CardHeaderImage = ({imgUrl}: CardHeaderImageProps) => {
	return (
		<div className={"image-first-container"} id={"card-header-image-container"}>
			<div className={"image-second-container"}>
				<img alt={"post-picture"} src={imgUrl} id={"post-photo"}/>
				<div className={"type-svg-container"}>
					<div id={"foreground-image"}/>
					<div id={"foreground-image1"}/>
				</div>
			</div>
			<div id={"type-section"} ></div>
		</div>
	)
}

export default CardHeaderImage;