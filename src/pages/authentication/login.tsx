import { useState, useContext, useEffect } from 'react'
import AuthContext from '../../providers/auth';
import styles from "./Login.module.css"
import {useRouter} from 'next/router'

const initialFormState = {
  email: '',
  password: ''
}


export default function Login({loggedUser}) {
  
  const context = useContext(AuthContext);
  const [form, setForm] = useState(initialFormState)
  const router = useRouter()

  if(loggedUser){
    useEffect(() => {
        router.push('/')
    }, [])
  }

  const setInput = (newValue) => {
    setForm(form => ({...form, ...newValue}))
  }

  const handleLogin = async (form) => {
    context.Login(form);
  };


  if(typeof localStorage !== "undefined"){
    localStorage.setItem('user', JSON.stringify(context.user))
  }

  if(context.user){
    router.push('/')
  }

  return (
    <section className={styles.loginContainer}>
      <div className={styles.loginValuesContainer}>
        <div className={styles.logoBrand}>
          <img className={styles.loginLogo} src="/logo.png" alt="Dudow logo"/>
          <h2>CreativeCodow</h2>
        </div>
        <div className={styles.loginCell}>
          <label htmlFor="">Email Adress</label>
          <input type="text" onChange={e => setInput({email: e.target.value})}/>
        </div>
        <div className={styles.loginCell}>
          <label htmlFor="">Password</label>
          <input type="password" onChange={e => setInput({password: e.target.value})} value={form.password}/>
        </div>
        <button className={styles.loginButton} onClick={() => handleLogin(form)} disabled={!form.email || !form.password}>
          Login
        </button>
      </div>
    </section>
  )
}

export const getServerSideProps = () => {

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