import {useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout/Layout.js'
import SearchInput from '../components/SearchInput/SearchInput.js'
import CountriesTable from '../components/CountriesTable/CountriesTable.js'

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState({})
  const [results, setResults] = useState([])

  useEffect(() => {

    fetch(`https://api.github.com/users/${keyword}`, {
      headers: {
          'Authorization': `Dudow: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`
        }
      } 
    )
    .then((res) => res.json())
    .then((response) => setUser(response))

    setResults([...results, user])


  }, [keyword]);

  const onInputChange = (e) => {
    e.preventDefault()

    setKeyword(e.target.value.toLowerCase())
  }

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <SearchInput 
            placeholder="Filter by name, Region or SubRegion" 
            onChange={onInputChange} />
        </div>
      </div>
      <CountriesTable user={user}/>
    </Layout>
  )
}

export const getStaticProps = async () => {
  return{
    props: {
    },
  }
}