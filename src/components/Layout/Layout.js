import Head from 'next/head'
import styles from './Layout.module.css'
import Link from "next/link";
import { Brightness6Rounded } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

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
			
			<Header title={title} switchTheme={switchTheme}/>
			
			<main className={styles.main}>
				{children}
			</main>

			<Footer  />
		</div>
	)
}

export default Layout