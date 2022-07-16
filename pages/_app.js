import '../styles/globals.css';
import { AuthUserProvider } from '../context/AuthUserContext';
import Header from '../src/components/Header/Header';

function MyApp({ Component, pageProps }) {
  return (
    // apapun component yang di dalam AuthUserProvider bisa mengakses variable/state yang ada di dalamnya
    <AuthUserProvider>
      <Header />
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}

export default MyApp;
