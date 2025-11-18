import styles from './Header.module.css'
import PageThemeToggle from "../PageThemeToggle/PageThemeToggle.tsx";

interface HeaderProps {
    title: string
}

const Header: React.FC<HeaderProps> = ({title}) => {
    return (
        <div className={styles['header-container']}>
            <h1 className={styles.title}>{title}</h1>
            <PageThemeToggle/>
        </div>
    )
}


export default Header;