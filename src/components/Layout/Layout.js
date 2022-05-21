import Header from '../Header/Header';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={styles.content}>{children}</main>
    </>
  )
}