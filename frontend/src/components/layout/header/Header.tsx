import "./Header.css"
import {useLocation} from "react-router-dom";
import {LocalBalanceToken} from "./account/LocalBalanceToken/LocalBalanceToken";

function Header() {
  const location = useLocation();
  let headerStyle: any = '';

  const renderHeader = () => {
    const headerStyle = '';

    if (location.pathname !== '/home') {
      return(
        <>
          <button className={"back-btn"} onClick={() => {
            window.history.back();
          }}/>
          <div className={"logo-serenium"}/>
        </>
      )
    } else {
      return (
        <div id={"header-left-container"}>
          <div className={"logo-serenium"}/>
          <div className="logoTextSerenium"/>
        </div>
      )
    }
  }

    if (location.pathname === '/full-screen-post') {
      headerStyle = 'full-screen-header-style'
    }

  const headerContainerClass = `headerContainer ${headerStyle}`

    return (
        <header className={headerContainerClass}>
          {renderHeader()}
          <LocalBalanceToken/>
        </header>
    );
}

export { Header };