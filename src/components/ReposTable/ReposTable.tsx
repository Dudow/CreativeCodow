import { useEffect, useState } from "react"; 
import ReposRow from './ReposRow/ReposRow'
import api from '../../services/api';
import styles from "./ReposTable.module.css";


type RepoType = {
  id: number,
  name: string,
  html_url: string,
  description: string,
  created_at: string
  updated_at: string
  stargazers_count: number
  forks: number
  active: false
}

const ReposTable = (userData) => {

  const user = userData.props

  const [repos, setRepos] = useState<RepoType[]>()

  const getRepo = async (user) => {
    try{
        const resRepos = await api.get(`https://api.github.com/users/${user.login}/repos`)
      
          return resRepos
    } catch(e){
        console.log(e)
    }
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
    <div className={styles.details_repos }>
      {repos?.map(repo => {
        return(
          <ReposRow key={repo.id} repo={repo}/>
        )
      })}
        
    </div>
  );
};

export default ReposTable;