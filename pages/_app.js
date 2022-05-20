import '../styles/globals.css';
import Layout from '../src/components/Layout/Layout';
import { GlobalProvider } from "../src/context/GlobalState";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalProvider>
  );
}

export default MyApp
