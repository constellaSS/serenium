import { useApi, useAccount } from '@gear-js/react-hooks';
import { Routing } from 'pages';
import { Header, ApiLoader } from 'components';
import { withProviders } from 'hocs';
import './normalize.css';
import NavBar from "./components/layout/NavBar/NavBar";
import ConnectWallet from "./pages/ConnectWallet/ConnectWallet";

function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();

  const isAppReady = isApiReady && isAccountReady;

  return (
    <>
      {isAppReady && <Header/>}
      <main>{isAppReady ? <Routing /> : <ApiLoader />}</main>
      {isAppReady && <NavBar/>}
    </>
  );
}

export const App = withProviders(Component);
