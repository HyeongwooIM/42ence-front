import styles from "./SubjectIndex.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;

interface SubjectCircle {
  info: String;
  subject_name: String;
}
interface SubjectList {
  circle: Number;
  subject_info: SubjectCircle[];
}

export default function PdfIndex() {
  const [circle, setCircle] = useState<Number>(0);
  const [subjectList, setSubjectList] = useState<SubjectList[]>([]);
  const [selectCircle, setSelectCircle] = useState(0);

  useEffect(() => {
    fetch(`${baseUrl}/subject/list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("42ence-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setSubjectList(data));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.subjectTitle}>과제 전체보기</div>
      <div className={styles.subjectCircle}>
        {subjectList.map((data, index) => (
          <div
            className={`${
              selectCircle === index ? styles.selectListTitle : styles.listTitle
            }`}
            key={index}
            onClick={() => setSelectCircle(index)}
          >
            <a>
              <>{data.circle}circle</>
            </a>
          </div>
        ))}
      </div>
      <div className={styles.subjectList}>
        {subjectList[selectCircle]?.subject_info.map((subject, i) => (
          <div key={i}>
            <div>
            <div className={`${i !== 0 && styles.divisionLine}`}/>
              <Link to={`/${selectCircle}_circle/${subject.subject_name}`} className={styles.subjectContent}>
                <div className={styles.subjectName}>{subject.subject_name}</div>
                <div className={styles.subjectInfo}>{subject.info}</div>
              </Link>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
