import Link from "next/link";
import { useEffect, useState } from "react"
import Layout from "../../components/Layout/Layout.js"
import styles from "./Country.module.css"
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import {format} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

const changeDate = (date) => {
    const currentDate = format(new Date(date), 'MMM Y', {
        locale: ptBR
    })

    return(currentDate)
}

const getRepo = async (user) => {

    const res = await fetch(`https://api.github.com/users/${user.login}/repos`, {
        headers: {
            'Authorization': `Dudow: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`
          }
        } 
    )

    const resRepos = await res.json() 

    return resRepos
}

const User = ({user}) => {

    const [repos, setRepos] = useState([])

    const getRepos = async () => {

        const repoSearch = await getRepo(user)

        setRepos(repoSearch)
    }

    useEffect(() => {
        getRepos()
    }, [])

    return (
        <Layout title={user.login}>
            <div className={styles.container}>
                <div className={styles.container_left}>
                    <div className={styles.overview_panel}>
                        <img src={user.avatar_url} alt={user.name}/>
                        <h1 className={styles.overview_name}>{user.login}</h1>
                        <div className={styles.overview_region}>{user.bio}</div>
                        <div className={styles.overview_number}>
                            <div className={styles.overview_population}>
                                <div className={styles.overview_value}>
                                    {user.followers || "Unknown"}
                                </div>
                                <div className={styles.overview_label}>
                                    Seguidores
                                </div>
                            </div>
                            <div className={styles.overview_area}>
                                <div className={styles.overview_value}>
                                    {user.followers || "Unknown"}
                                </div>
                                <div className={styles.overview_label}>
                                    Seguindo
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.container_right}>
                    <div className={styles.details_panel}>
                        <div className={styles.back}>
                            <Link href={`/`}>
                                <span className={styles.back_label}>
                                    <ArrowBackRoundedIcon/> Back
                                </span>
                            </Link>
                        </div>
                        <h4 className={styles.details_panel_heading}>
                            Details
                        </h4>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Nome</div>
                            <div className={styles.details_panel_value}>{user.name}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Blog</div>
                            <div className={styles.details_panel_value}>
                                <a href={user.blog} target="_blank">{user.blog}</a>
                            </div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Compania</div>
                            <div className={styles.details_panel_value}>{user.company || "Unknown"}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Localização</div>
                            <div className={styles.details_panel_value}>{user.location}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Repositórios Públicos</div>
                            <div className={styles.details_panel_value}>{user.public_repos}</div>
                        </div>

                        <div className={styles.details_borders}>
                            <div className={styles.details_borders_container}>
                                <table className={styles.details_repos_container}>
                                    <tr>
                                        <th>Repositório</th>
                                        <th>Criado em</th>
                                        <th>Ultima atualização</th>
                                        <th>Stars</th>
                                        <th>Forks</th>
                                    </tr>
                                    {repos.map(repo => (
                                        <tr>
                                            <td><a href={repo.html_url} target="_blank">{repo.name}</a></td>
                                            <td>{changeDate(repo.created_at)}</td>
                                            <td>{changeDate(repo.updated_at)}</td>
                                            <td>{repo.stargazers_count}</td>
                                            <td>{repo.forks}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    
    )
}

export default User

export const getStaticPaths = async () => {

    return{
        paths: [],
        fallback: 'blocking',
    }
}

export const getStaticProps = async ({ params }) => {

    const res = await fetch(`https://api.github.com/users/${params.login}`)
    const user = await res.json() 

    return{
        props: {
            user,
        },
        revalidate: 60 * 60 * 3,
    }
}