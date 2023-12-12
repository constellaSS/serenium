import styles from './Tag.module.css'
interface TagProps {
	name: string
}
const Tag = ({name}: TagProps) => {
	return (
		<>
			<div className={styles.tagContainer}>
				<p className={styles.tagText}>{`#${name}`}</p>
			</div>
		</>
	)
}

export default Tag;