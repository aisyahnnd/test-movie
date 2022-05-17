import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
    return (
        <header className={styles.container}>
            <ul className={styles.list}>
                <li className={styles.item}><Link href="/">Home</Link></li>
                <li className={styles.item}><Link href="/">Search</Link></li>
                <li className={styles.item}><Link href="/">Login</Link></li>
            </ul>
        </header>
    );
}