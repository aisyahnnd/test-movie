import '../styles/globals.css';
import { GlobalProvider } from "../src/context/GlobalState";
import { AuthUserProvider } from '../context/AuthUserContext';
import Header from '../src/components/Header/Header';

function MyApp({ Component, pageProps }) {

  return (        
    <GlobalProvider>
        <AuthUserProvider>
          <Header/>
          <Component {...pageProps} />
        </AuthUserProvider>
    </GlobalProvider>
  );
}

export default MyApp;
