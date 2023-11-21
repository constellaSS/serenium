import './Tag.css'
interface TagProps {
	name: string
}
const Tag = ({name}: TagProps) => {

	return (
		<>
			<div className={"tag-container"}>
				<p className={"tag-text"}>{`#${name}`}</p>
			</div>
		</>
	)
}

export default Tag;