import { Account } from './account';
import "./Header.css"
import {useLocation} from "react-router-dom";
import * as url from "url";

type Props = {
    isAccountVisible: boolean;
};

function Header({ isAccountVisible }: Props) {
  const location = useLocation();
  let headerStyle: any = '';

  const renderHeader = () => {
    const headerStyle = '';

    if (location.pathname !== '/') {
      return(
        <>
          <button className={"back-btn"}/>
          <div className={"logo-serenium"}/>
        </>
      )
    } else {
      return (
        <>
          {isAccountVisible && <Account />}
          <div className="logoTextSerenium" />
        </>
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
          <button className="dropdownButtonMenu" type="button"> </button>
        </header>
    );
}

export { Header };