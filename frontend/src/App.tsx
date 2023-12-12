import { useApi, useAccount } from '@gear-js/react-hooks';
import { Routing } from 'pages';
import { Header, ApiLoader, Navbar } from 'components';
import { withProviders } from 'hocs';
import './normalize.css';

function Component() {
  const { isApiReady } = useApi();
  const { account, isAccountReady } = useAccount();

  const isAppReady = isApiReady && isAccountReady;

  const isAccountConnected = account?.decodedAddress as string !== undefined;

  return (
    <>
      {isAppReady && isAccountConnected && <Header/>}
      <main>{isAppReady ? <Routing /> : <ApiLoader />}</main>
      {isAppReady && isAccountConnected && <Navbar/>}
    </>
  );
}

export const App = withProviders(Component);
