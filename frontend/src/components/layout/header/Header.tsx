import { Account } from './account';
import "./Header.css"
import {useLocation} from "react-router-dom";

type Props = {
    isAccountVisible: boolean;
};

function Header({ isAccountVisible }: Props) {
  const location = useLocation();

  const renderHeader = () => {
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

    return (
        <header className='headerContainer'>
          {renderHeader()}
          <button className="dropdownButtonMenu" type="button"> </button>
        </header>
    );
}

export { Header };