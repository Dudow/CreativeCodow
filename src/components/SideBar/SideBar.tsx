import styles from './SideBar.module.scss'

const SideBar = ({...rest}) => {
    return(
        <div className={styles.wrapper}>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
}

export default SideBar