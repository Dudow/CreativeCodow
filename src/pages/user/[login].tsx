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

const User = ({user, loggedUser}) => {

    const context = useContext(AuthContext);

    const [repos, setRepos] = useState<UserResponse[]>()
    const router = useRouter()

    if(typeof localStorage !== "undefined"){
        loggedUser = context.getUser()
      }
    
    if(!context.user && !loggedUser){
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
                        <div className={styles.overview_bio}>{user.bio}</div>
                        <div className={styles.overview_numbers}>
                            <div className={styles.overview_population}>
                                <div>
                                    {user.followers || "Unknown"}
                                </div>
                                <div className={styles.overview_label}>
                                    Seguidores
                                </div>
                            </div>
                            <div>
                                <div className={styles.overview_value}>
                                    {user.following || "Unknown"}
                                </div>
                                <div className={styles.overview_label}>
                                    Seguindo
                                </div>
                            </div>
                        </div>
                        <div className={styles.go_to_perfil}>
                            <a href={user.html_url} target="_blank">
                                Ir para o perfil
                            </a>
                            
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
                                {user.blog ?
                                <a href={fixRoute(user.blog)} target="_blank">{user.blog}</a> :
                                    "Não informado"
                                }
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

                        <div className={styles.details_repos}>
                            <div className={styles.details_repos_row}>

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

    let loggedUser

    const {data} = await api.get(`https://api.github.com/users/${params.login}`, {
        headers: {
          authorization: 'token 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'
        }
    })

    if(typeof localStorage !== "undefined"){
        loggedUser = localStorage?.getItem('user')
        return{
            props: {
                user: data,
                loggedUser
            },
            revalidate: 60 * 60 * 3,
        }
    }

    return{
        props: {
            user: data,
            loggedUser: null
        },
        revalidate: 60 * 60 * 3,
    }
}