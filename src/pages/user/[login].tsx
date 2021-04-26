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

type UserResponse = {
    id: number,
    name: string
    html_url: string
    stargazers_count: number
    forks: number
    created_at: Date
    updated_at: Date
}

const changeDate = (date) => {
    const currentDate = format(new Date(date), 'MMM Y', {
        locale: ptBR
    })

    return(currentDate)
}

const getRepo = async (user) => {

    try{
        const resRepos = await api.get(`https://api.github.com/users/${user.login}/repos`, {
            headers: {
              authorization: 'token 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'
            }
          })
      
          return resRepos
    } catch(e){
        console.log(e)
    }
}

const User = ({user}) => {

    const context = useContext(AuthContext);

    const [repos, setRepos] = useState<UserResponse[]>()
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

        if(repoSearch){
            setRepos(repoSearch.data)
        }

        
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
                        <h1 className={styles.overview_name}>
                            <a href={fixRoute(user.html_url)} target="_blank">
                                {user.login}
                            </a>
                        </h1>
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
                                <a href={fixRoute(user.blog)} target="_blank">{user.blog || "Não informado"}</a>
                            </div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Compania</div>
                            <div className={styles.details_panel_value}>{user.company || "Não informada"}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Localização</div>
                            <div className={styles.details_panel_value}>{user.location || "Não informada"}</div>
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
                                    {repos?.map(repo => (
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

    // const user = await api.get(`https://api.github.com/users/${params.login}`, {
    //   headers: {
    //     authorization: 'token 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'
    //   }
    // })

    const user = {
        "login": "ArturCx",
        "id": 63474242,
        "node_id": "MDQ6VXNlcjYzNDc0MjQy",
        "avatar_url": "https://avatars.githubusercontent.com/u/63474242?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/ArturCx",
        "html_url": "https://github.com/ArturCx",
        "followers_url": "https://api.github.com/users/ArturCx/followers",
        "following_url": "https://api.github.com/users/ArturCx/following{/other_user}",
        "gists_url": "https://api.github.com/users/ArturCx/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/ArturCx/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/ArturCx/subscriptions",
        "organizations_url": "https://api.github.com/users/ArturCx/orgs",
        "repos_url": "https://api.github.com/users/ArturCx/repos",
        "events_url": "https://api.github.com/users/ArturCx/events{/privacy}",
        "received_events_url": "https://api.github.com/users/ArturCx/received_events",
        "type": "User",
        "site_admin": false,
        "name": "Artur César ",
        "company": null,
        "blog": "",
        "location": "Minas Gerais, Brasil",
        "email": "arturcesarsilva@gmail.com",
        "hireable": null,
        "bio": null,
        "twitter_username": null,
        "public_repos": 2,
        "public_gists": 0,
        "followers": 6,
        "following": 7,
        "created_at": "2020-04-10T19:45:52Z",
        "updated_at": "2021-04-06T21:16:10Z"
      }

    return{
        props: {
            user,
        },
        revalidate: 60 * 60 * 3,
    }
}