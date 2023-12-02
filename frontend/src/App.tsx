import { useApi, useAccount } from '@gear-js/react-hooks';
import { Routing } from 'pages';
import { Header, ApiLoader } from 'components';
import { withProviders } from 'hocs';
import './normalize.css';
import NavBar from "./components/layout/NavBar/NavBar";

function Component() {
  const { isApiReady } = useApi();
  const { account, isAccountReady } = useAccount();

  const isAppReady = isApiReady && isAccountReady;

  const isAccountConnected = account?.decodedAddress as string !== undefined;

  return (
    <>
      {isAppReady && isAccountConnected && <Header/>}
      <main>{isAppReady ? <Routing /> : <ApiLoader />}</main>
      {isAppReady && isAccountConnected && <NavBar/>}
    </>
  );
}

export const App = withProviders(Component);
