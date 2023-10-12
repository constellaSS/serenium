import { Account } from './account';
import "./Header.css"

type Props = {
    isAccountVisible: boolean;
};

function Header({ isAccountVisible }: Props) {
    return (
        <header className='headerContainer'>
            {isAccountVisible && <Account />}
            <div className="logoTextSerenium" />
            <button className="dropdownButtonMenu" type="button"> </button>
        </header>
    );
}

export { Header };