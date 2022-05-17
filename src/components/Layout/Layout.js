import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={styles.content}>{children}</main>
      <Footer />
    </>
  )
}