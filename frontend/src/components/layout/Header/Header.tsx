import styles from "./Header.module.css"
import {LocalBalanceToken} from "./account/LocalBalanceToken/LocalBalanceToken";

export function Header() {
  const renderHeader = () => {
    if (window.location.pathname !== '/home') {
      return(
        <>
          <button className={styles.backBtn} onClick={() => {
            window.history.back();
          }}/>
          <div className={styles.logoSerenium}/>
        </>
      )
    } else {
      return (
        <div className={styles.headerLeftContainer}>
          <div className={styles.logoSerenium}/>
          <div className={styles.logoTextSerenium}/>
        </div>
      )
    }
  }

  const headerContainerClass = `${styles.headerContainer} ${window.location.pathname === '/full-screen-post' ? styles.fullScreenHeaderStyle : ''}`

  return (
    <header className={headerContainerClass}>
      {renderHeader()}
      <LocalBalanceToken/>
    </header>
  );
}