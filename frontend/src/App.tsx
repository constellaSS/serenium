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

  const [showRectangles, setShowRectangles] = useState(false);
  const numberOfRectangles = 5; // Número de rectángulos a mostrar
    const generateRectangles = () => {
        setShowRectangles(true);
    };

    const rectangles = Array.from({ length: numberOfRectangles }, (_, index) => (
        <div key={index} className="blue-rectangle"></div>
    ));

  return (
    <>
      <Header isAccountVisible={isAccountReady} />
      <main>{isAppReady ? <Routing /> : <ApiLoader />}</main>
        <div>
            <Post />
        </div>
        <PostCard title={'OLA'} content={'xdxdxdxd'} type={1}></PostCard>
        <div>
            <h1>Generador de Rectángulos Azules</h1>
            <button onClick={generateRectangles}>Mostrar Rectángulos</button>
            {showRectangles && (
                <div className="rectangle-container">
                    {rectangles}
                </div>
            )}
        </div>
    </>
  );
}

export const App = withProviders(Component);
