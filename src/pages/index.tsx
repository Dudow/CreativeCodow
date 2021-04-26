import {useState, useEffect, useContext, useCallback} from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout/Layout.js'
import SearchInput from '../components/SearchInput/SearchInput'
import CountriesTable from '../components/UsersTable/UsersTable'
import AuthContext from '../providers/auth';
import {useRouter} from 'next/router'
import api from '../services/api';

type UserType = {
  id: number,
  login: string,
  name: string,
  avatar_url: string,
  bio: string
}

export default function Home(loggedUser) {
  const [user, setUser] = useState<UserType>()
  const [results, setResults] = useState([])
  const router = useRouter()
  const context = useContext(AuthContext);


  if(typeof localStorage !== "undefined"){
    loggedUser = context.getUser()
  }

  if(!context.user && !loggedUser){
    useEffect(() => {
        router.push('/authentication/login')
    }, [])
  }

  const getUser = useCallback(async (keyword) => {

    try{
      const res = await api.get(`https://api.github.com/users/${keyword}`)

      if(res){
        setUser(res.data)
        setResults([...results, user])
      }

    }catch(e){
      console.log(e)
    }

    return
  }, ([]));

  const onInputChange = (e) => {
    e.preventDefault()
    
    getUser(e.target.value.toLowerCase())
  }

  return (
    <Layout title={`CreativeCodow`}>
        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <SearchInput 
              placeholder="Search an user" 
              onChange={onInputChange} />
          </div>
        </div>
        <h1>
          Bem vindo, {loggedUser?.name}
        </h1>
        <CountriesTable user={user}/>
    </Layout>
  )
}

export const getStaticProps = async () => {
  let loggedUser

  if(typeof localStorage !== "undefined"){
    loggedUser = localStorage?.getItem('user')
    return {
      props: { loggedUser },
    }
  }

  return {
    props: { loggedUser: null },
  }
}