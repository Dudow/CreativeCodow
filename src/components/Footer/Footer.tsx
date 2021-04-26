import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

import styles from './Footer.module.css'

const Footer = () => {
    return(
        <>
            <footer className={styles.footer}>
				<p>
                    <FavoriteRoundedIcon/>
                </p>  
                    Dudow 
                <p>
                    <FavoriteRoundedIcon/>
                </p> 
			</footer>
        </>
    )
}

export default Footer