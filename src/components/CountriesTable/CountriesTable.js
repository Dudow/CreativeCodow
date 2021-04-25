import Link from "next/link";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded} from "@material-ui/icons";
import { useState } from "react";
import styles from "./CountriesTable.module.css";

const orderBy = (countries, user, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries, user }) => {
  const [value, setValue] = useState();

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
      </div>

        <Link href={`/user/${user.login}`} key={user.name}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img className={styles.userImg} src={user.avatar_url} alt={user.name} />
            </div>
            <div className={styles.name}>{user.name}</div>
          </div>
        </Link>
    </div>
  );
};

export default CountriesTable;