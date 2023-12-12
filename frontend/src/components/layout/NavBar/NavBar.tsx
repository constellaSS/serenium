import styles from './Navbar.module.css'

export function Navbar() {
	return(
		<div className={styles.navbar}>
			<button type='button' className={`${styles.navbarButton} ${styles.navBtn1}`} onClick={() => {
				window.location.href = '/'
			}}/>
			<button type='button' className={`${styles.navbarButton} ${styles.navBtn3}`} onClick={() => {
				window.location.href = '/new-post'
			}}/>
			<button type='button' className={`${styles.navbarButton} ${styles.navBtn5}`} onClick={() => {
				window.location.href = '/profile'
			}}/>
		</div>
	)
}
