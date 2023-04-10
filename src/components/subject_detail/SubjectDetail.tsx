import styles from "./SubjectDetail.module.css";

import SubjectComment from "./SubjectComment";
import Menu from "../menu/Menu";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import SubjectWiki from "./SubjectWiki";
import SubjectInfo from "./SubjectInfo";
import { useRecoilState } from "recoil";
import { profileState } from "../../utils/recoil/user";
import { modalState } from "../../utils/recoil/modal";

interface wiki {
  wikiContent?: string;
  version?: number;
}

export default function SubjectDetail() {
  const [wiki, setWiki] = useState<wiki>();
  const [isWikiEdit, setIsWikiEdit] = useState<Boolean>(false);
  const [userState, setProfileState] = useRecoilState(profileState);
  const [scroll, setScroll] = useState(0);
  const maxScroll = getMaxScroll();
  const [isModalState, setIsModalState] = useRecoilState(modalState);
  const [contentState, setContentState] = useState("wiki");

  function getMaxScroll() {
    const { scrollHeight, offsetHeight } = document.documentElement;
    return Math.max(scrollHeight, offsetHeight) - window.innerHeight;
  }
  const params = useParams() as { circle: string; sbj_name: string }; //params  = {subject : sbj_name}
  // const {circle, sbj_name} = params
  const sbj: string = params.sbj_name;

  function onScroll() {
    setScroll(Math.floor(window.scrollY));
  }

  useEffect(() => {
    fetch(`http://10.18.241.49:3001/wiki`)
      .then((res) => res.json())
      .then((data) => setWiki(data));
  }, [isWikiEdit]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scroll]);

  return (
    <div>
      <Menu intraId={"him"} menuName={"과제리뷰"} />
      <div className={styles.subject}>
        <div className={styles.subjectDetail}>
          <div className={styles.subtitle}>
            {params.sbj_name}
          </div>
          <div>
            <SubjectInfo />
          </div>
          <div>
            {contentState === "wiki" ? <div>
            <div className={styles.tab}>
              <div className={styles.tab_select_btn} onClick={() => setContentState("wiki")}>
                  위키42
              </div>
              <div className={styles.tab_btn} onClick={() => setContentState("subject")}>
                  과제 후기
              </div>
          </div>
            <div className={styles.SubjectWiki}>
              {isWikiEdit ? (
                <div>
                  <SubjectWiki
                    setIsWikiEdit={setIsWikiEdit}
                    content={wiki?.wikiContent}
                    version={wiki?.version}
                  />
                </div>
              ) : (
                <div>
                  <div className={styles.wikiContent}>
                    {wiki?.wikiContent && (
                      <div
                        dangerouslySetInnerHTML={{ __html: wiki.wikiContent }}
                      />
                    )}
                  </div>
                  {/* {wiki?.wikiContent} */}
                  <button onClick={() => setIsWikiEdit(true)}>수정하기</button>
                </div>
              )}
            </div></div> : <div>
            <div className={styles.tab}>
              <div className={styles.tab_btn} onClick={() => setContentState("wiki")}>
                  위키42
              </div>
              <div className={styles.tab_select_btn} onClick={() => setContentState("subject")}>
                  과제 후기
              </div>
          </div>
            <div className={styles.content}>
              <SubjectComment />
              <div className={styles.floting}>
                <button
                  onClick={() => setIsModalState({ isModal: true })}
                  className={styles.floting}
                >
                  {" "}
                  후기 작성
                </button>
              </div>
            </div></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
