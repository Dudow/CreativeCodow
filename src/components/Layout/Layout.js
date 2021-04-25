import Head from 'next/head'
import styles from './Layout.module.css'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import Link from "next/link";
import { Brightness6Rounded } from '@material-ui/icons';
import { useEffect, useState } from 'react';

const Layout = ({children, title}) => {

	const [theme, setTheme] = useState('light')

	useEffect(() => {
		document.documentElement.setAttribute(
		"data-theme",
		localStorage.getItem("theme")
		);

		setTheme(localStorage.getItem("theme"));
	}, []);

	const switchTheme = () => {
		if (theme === "dark") {
		saveTheme("light");
		} else {
		saveTheme("dark");
		}
	};

	const saveTheme = (theme) => {
		setTheme(theme);
		localStorage.setItem("theme", theme);
		document.documentElement.setAttribute("data-theme", theme);
	};

	return(
		<div className={styles.container}>
			
			<Head>
				<title>{title}</title>
				<link rel="icon" href="https://resume-mocha.vercel.app/assets/logo.png" />
			</Head>

			<header className={styles.header}>
				<Link href="/">
					<h2 className={styles.logo_h2}><img src="https://resume-mocha.vercel.app/assets/logo.png" alt="logo" className={styles.logo}/> Worldow Ranks</h2>
				</Link>
			</header>

			<button className={styles.themeSwitcher} onClick={switchTheme}>
				<Brightness6Rounded/>
			</button>

			
			<main className={styles.main}>
				{children}
			</main>
			
			<footer className={styles.footer}>
				<p><FavoriteRoundedIcon/></p>  Dudow <p><FavoriteRoundedIcon/></p> 
			</footer>
		</div>
	)
}

export default Layout