import Link from "next/link";
import { useEffect, useState, useContext } from "react"
import Layout from "../../components/Layout/Layout.js"
import styles from "./User.module.css"
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import {format} from 'date-fns'
import AuthContext from '../../providers/auth';
import ptBR from 'date-fns/locale/pt-BR'
import {useRouter} from 'next/router'
import api from '../../services/api';

const changeDate = (date) => {
    const currentDate = format(new Date(date), 'MMM Y', {
        locale: ptBR
    })

    return(currentDate)
}

const getRepo = async (user) => {

    const resRepos = await api.get(`https://api.github.com/users/${user}/repo`, {
      headers: {
        // 'Authorization': 'Dudow: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'
      }
    })
    
    console.log(resRepos)

    return resRepos
}

const User = ({user}) => {

    const context = useContext(AuthContext);


    const [repos, setRepos] = useState([])
    const router = useRouter()

    if(!context.user){
        useEffect(() => {
            router.push('/authentication/login')
        }, [])
    }

    function fixRoute(blog){
        return blog.includes('https') ? blog : `https://${blog}` 
    }

    const getRepos = async () => {

        const repoSearch = await getRepo(user)

        console.log(repoSearch)

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
                                    {user.following || "Unknown"}
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
                                <a href={fixRoute(user.blog)} target="_blank">{user.blog}</a>
                            </div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Compania</div>
                            <div className={styles.details_panel_value}>{user.company || "Nenhuma"}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Localização</div>
                            <div className={styles.details_panel_value}>{user.location || "Desconhecida"}</div>
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

    const user = await api.get(`https://api.github.com/users/${params.login}`, {
      headers: {
        'Authorization': 'Dudow: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'
      }
    })

    return{
        props: {
            user,
        },
        revalidate: 60 * 60 * 3,
    }
}