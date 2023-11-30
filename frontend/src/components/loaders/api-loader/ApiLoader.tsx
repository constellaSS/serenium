import styles from './ApiLoader.module.css';
import CustomLoader from "./CustomLoader/CustomLoader";

function ApiLoader() {
  return(
    <div className={styles.loadingScreenContainer}>
      <div className={styles.logoLoading}/>
      <p className={styles.loadingText}>Loading</p>
      <div className={styles.loaderContainer}>
        <CustomLoader/>
      </div>
    </div>
  )
}

export { ApiLoader };
