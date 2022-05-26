import '../styles/globals.css';
import { AuthUserProvider } from '../context/AuthUserContext';
import Header from '../src/components/Header/Header';

function MyApp({ Component, pageProps }) {

  return (        
    <AuthUserProvider>
      <Header/>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}

export default MyApp;
