import styles from './Footer.module.css';
import SimpleBottomNavigation from '../../components/MainNav';

export default function Footer() {
    return (
        <div>
            <p className={styles.title}>made with love</p>
            {/* <SimpleBottomNavigation /> */}
        </div>
    );
}