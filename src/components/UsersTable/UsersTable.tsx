import Link from "next/link";
import styles from "./UsersTable.module.css";

type UserPropsType = {
  user: {
    id: number,
    login: string,
    name: string,
    avatar_url: string,
    bio: string
  }
}

const UsersTable = ({ user }: UserPropsType) => {
  return (
    <div>
      {user?.id ?
        <Link href={`/user/${user.login}`} key={user.name}>
          <div className={styles.row}>
            <div className={styles.pic}>
              <img className={styles.userImg} src={user.avatar_url} alt={user.name} />
            </div>
            <div className={styles.name}>
              <span>
                {user.login}  {user.name? `- ${user.name}` : ''}
              </span>
              <span>
                {user.bio}
              </span>
            </div>
          </div>
        </Link> : 
        <div></div>
      }
    </div>
  );
};

export default UsersTable;