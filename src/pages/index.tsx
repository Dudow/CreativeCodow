import {useState, useEffect, useContext, useCallback} from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout/Layout.js'
import SearchInput from '../components/SearchInput/SearchInput.js'
import CountriesTable from '../components/CountriesTable/CountriesTable.js'
import AuthContext from '../providers/auth';
import {useRouter} from 'next/router'
import api from '../services/api';

export default function Home(loggedUser) {
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState({})
  const [activeUser, setactiveUser] = useState({})
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

    const res = await api.get(`https://api.github.com/users/${keyword}`, {
      headers: {
        authorization: 'Dudow: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'
      }
    })

    setUser(res.data)
    setResults([...results, user])
  }, ([]));

  const onInputChange = (e) => {
    e.preventDefault()

    setKeyword(e.target.value.toLowerCase())
    
    console.log(keyword)

    getUser(keyword)
  }

  return (
    
    <Layout title={`CreativeCodow`}>
        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <SearchInput 
              placeholder="Filter by name, Region or SubRegion" 
              onChange={onInputChange} />
          </div>
        </div>
        <h1>
          Bem vindo, {context.user}
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