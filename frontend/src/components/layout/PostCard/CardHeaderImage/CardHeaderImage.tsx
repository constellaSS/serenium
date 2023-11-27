import './CardHeaderImage.css'
interface CardHeaderImageProps {
	imgUrl: string
}

const CardHeaderImage = ({imgUrl}: CardHeaderImageProps) => {
	return (
		<div id={"card-header-image-container"}>
			<img alt={"post-picture"} src={imgUrl} id={"post-photo"}/>
			<div id={"type-section"} ></div>
		</div>
	)
}

export default CardHeaderImage;