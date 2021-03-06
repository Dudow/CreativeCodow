import styles from "./ReposRow.module.css";

import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import { useState } from "react";

import {format} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

const changeDate = (date) => {
    const currentDate = format(new Date(date), 'MMM Y', {
        locale: ptBR
    })

    return(currentDate)
}


const ReposRow = ({repo}) => {

  const [isActive, setIsActive] = useState(false)

  return (
    <div className={styles.details_repos_row_container}>
      <div className={styles.details_repos_row} onClick={()=> {
        setIsActive(!isActive)
      }}>
        <h3>
          {repo.name}
          <i>
            {isActive ?
              <KeyboardArrowUpRoundedIcon/> :
              <ExpandMoreRoundedIcon/>
            }
          </i>
        </h3>
      </div>
      <div className={styles.details_repos_row_sub} style={{ display: isActive ? 'flex' : 'none' }}>
        <span>
          <strong>Descrição:</strong>
          {repo.description}
        </span>
        <span>
          <strong>Forks:</strong>
          {repo.forks}
        </span>
        <span>
          <strong>Stars:</strong>
          {repo.stargazers_count}
        </span>
        <span>
          <strong>Principal Linguagem:</strong>
          {repo.language}
        </span>
        <span>
          <strong>Data de criação:</strong>
          {changeDate(repo.created_at)}
        </span>
        <span>
          <strong>Ultima atualização:</strong>
          {changeDate(repo.updated_at)}
        </span>
        <div className={styles.go_to_repo}>
          <a href={repo.html_url} target="_blank">
            Ir para o Repositório
          </a>
        </div>

      </div>
    </div>
    
  );
};

export default ReposRow;