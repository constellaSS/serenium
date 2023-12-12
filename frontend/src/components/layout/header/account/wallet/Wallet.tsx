import { Account } from '@gear-js/react-hooks';
import { AccountButton } from '../account-button';
import styles from './Wallet.module.scss';
import {LocalBalanceToken} from "../../../../../../../../serenium-frontend-next/src/components/layout/Header/LocalBalanceToken/LocalBalanceToken";

type Props = {
  balance: Account['balance'];
  address: string;
  name: string | undefined;
  onClick: () => void;
};

function Wallet({ address, name, onClick }: Props) {
  return (
    <>
      <div className={"walletValue"}>
        <AccountButton address={address} name={name} onClick={onClick} />
      </div>
      <div className={"token-balance walletValue"}>
        <LocalBalanceToken/>
      </div>
    </>
  );
}

export { Wallet };
