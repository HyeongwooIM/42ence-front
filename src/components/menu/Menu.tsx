import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import DehazeIcon from "@mui/icons-material/Dehaze";

interface intraId{
  intraId:String;
}

export default function Menu({intraId}:intraId) {
  return (
    <div className={styles.background}>
      <div className={styles.flex_row}>
        <Link to="/" className={styles.logo}>
          <h2>42ence</h2>
        </Link>
        {/* <div className={styles.menu}>
          <Link to="/subjectList" className={styles.subject}>
            subject
          </Link>
          <Link to="/" className={styles.subject}>
            like42ence
          </Link>
        </div> */}
        <div className={styles.flex_interface}>
          <form>
            <input
              type="text"
              placeholder="과제 검색하기"
              className={styles.form}
            />
          </form>
          <div>
            <div className={styles.dropdown}>
              <button className={styles.dropbtn}>
                <span className={styles.dropbtn_icon}></span>
                {intraId}
                <DehazeIcon />
              </button>
              <div className={styles.dropdown_content}>
                <Link to={`/allComment/${intraId}`}>내가 쓴 댓글</Link>
                <Link to="#">로그아웃</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
