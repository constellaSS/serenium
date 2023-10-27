import { useApi, useAccount } from '@gear-js/react-hooks';
import { Routing } from 'pages';
import { Header, ApiLoader } from 'components';
import { withProviders } from 'hocs';
import './normalize.css';
import Post from "./components/layout/post/post";

function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();

  const isAppReady = isApiReady && isAccountReady;

  return (
    <>
      <Header isAccountVisible={isAccountReady} />
      <main>{isAppReady ? <Routing /> : <ApiLoader />}</main>
        <div>
            <h1>AAAAAAAAAA</h1>
            <Post />
        </div>
    </>
  );
}

export const App = withProviders(Component);
