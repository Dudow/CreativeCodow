import Head from 'next/head'
import Link from "next/link";
import { Brightness6Rounded } from '@material-ui/icons';

import styles from './Header.module.css'

type HeaderProps = {
    title: string,
    switchTheme: () => void
}

const Header = ({title, switchTheme}:HeaderProps) => {
    return(
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="https://resume-mocha.vercel.app/assets/logo.png" />
            </Head>

            <header className={styles.header}>
                <Link href="/">
                    <h2 className={styles.logo_h2}>
                        <img src="https://resume-mocha.vercel.app/assets/logo.png" alt="logo" className={styles.logo}/>
                        Creative Codow
                    </h2>
                </Link>
            </header>

            <button className={styles.themeSwitcher} onClick={switchTheme}>
                <Brightness6Rounded/>
            </button>
        </>
    )
}

export default Header