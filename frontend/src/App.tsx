import { useApi, useAccount } from '@gear-js/react-hooks';
import { Routing } from 'pages';
import { Header, ApiLoader } from 'components';
import { withProviders } from 'hocs';
import './normalize.css';
import Post from "./components/layout/post/post";
import PostCard from "./components/layout/PostCard/PostCard";
import {useState} from "react";

function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();

  const isAppReady = isApiReady && isAccountReady;

  return (
    <>
      <Header isAccountVisible={isAccountReady} />
      <main>{isAppReady ? <Routing /> : <ApiLoader />}</main>
        <div>
            <Post />
        </div>
        <PostCard title={'OLA'} content={'xdxdxdxd'} type={1}></PostCard>
    </>
  );
}

export const App = withProviders(Component);
