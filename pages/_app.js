import '../styles/globals.css';
import Layout from '../src/components/Layout/Layout';
import { GlobalProvider } from "../src/context/GlobalState";
import { AuthUserProvider } from '../context/AuthUserContext';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Layout>
        <AuthUserProvider>
          <Component {...pageProps} />
        </AuthUserProvider>
        
      </Layout>
    </GlobalProvider>
  );
}

export default MyApp
