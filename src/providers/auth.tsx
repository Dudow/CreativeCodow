import { useRouter } from 'next/router';
import React, { createContext, ReactNode, useCallback } from 'react';
import { useState } from 'react';
import api from '../services/api';

type AuthProviderData = {
  signed: boolean,
  user: {
    name: string,
    id: number,
    email: string,
    senha: string
  }
  Login: (form) => void
  signOut:() => void;
  getUser:() => userType
}

type AuthContextProviderProps = {
  children: ReactNode
}

type userType = {
  email: string,
  senha: string,
  name: string,
  id: number
}

const AuthContext = createContext({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {

  const [users, setUsers] = useState<userType[]>();
  const [activeUser, setActiveUser] = useState<userType>();
  const router = useRouter()

  const Login = async ({email, password}) => {
    const res = await api.get(`http://localhost:3333/users`)
    setUsers(res.data);

    if(users){
      users.map(user => {
        if(user.email == email && user.senha == password){
          if(typeof localStorage !== "undefined"){
            localStorage.setItem('user', JSON.stringify(user))
            setActiveUser(user)
          }
        }
      })
    }
  }

  const signOut = useCallback(() => {
    localStorage.removeItem('user')

    router.replace('/authentication/login');
  }, []);

  const getUser = useCallback(() => {
    const loggedUser = JSON.parse(localStorage?.getItem('user'))
    return loggedUser 
  }, []);

  return (
    <AuthContext.Provider value={{ 
      Login, 
      signed: Boolean(activeUser), 
      user: activeUser, 
      signOut,
      getUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
