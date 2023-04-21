import { useState, useEffect, useCallback } from "react";
import styles from "./SubjectComment.module.css";
import { Rating, TextField } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRecoilState } from "recoil";
import { profileState } from "../../utils/recoil/user";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface intraId {
  intraId: String;
}

export function convertTimeTaken(input: string): string {
  if (input === "a_week") {
    return "일주일 이내";
  } else if (input === "two_week") {
    return "1~2주 이내";
  } else if (input === "three_week") {
    return "3~4주 이내";
  } else if (input === "a_month") {
    return "한 달 이상";
  } else if (input === "three_month") {
    return "세 달 이상";
  } else {
    return "미정";
  }
}

export function convertDifficulty(input: string): string {
  if (input === "easy") {
    return "쉬워요";
  } else if (input === "normal") {
    return "보통이에요";
  } else if (input === "hard") {
    return "어려워요";
  } else {
    return "difficulty문제임";
  }
}

export function convertAmountStudy(input: string): string {
  if (input === "low") {
    return "적은 편이에요";
  } else if (input === "middle") {
    return "적당해요";
  } else if (input === "high") {
    return "많은 편이에요";
  } else {
    return "미정";
  }
}

export function convertBonus(input: string): string {
  if (input === "no") {
    return "안 했어요";
  } else if (input === "little") {
    return "하긴 했어요";
  } else if (input === "complete") {
    return "다 했어요";
  } else {
    return "미정";
  }
}

export interface Comment {
  id: number;
  like_num: number;
  intra_id: string;
  circle: number;
  user_level: number;
  subject_name: string;
  content: string;
  star_rating: number;
  time_taken: string;
  isComment: boolean;
  difficulty: string;
  bonus: string;
  amount_study: string;
  update_time: string;
}

export interface CommentProps {
  comment: Comment;
  showCommentEdit: boolean;
}

const PrintComment = ({ comment, showCommentEdit }: CommentProps) => {
  const [userState, setProfileState] = useRecoilState(profileState);
  const [isLike, setIsLike] = useState<Boolean>();
  const [showEdit, setShowEdit] = useState<Boolean>(false);
  const [isCommentEdit, setIsCommentEdit] = useState<Boolean>(false);
  const [content, setContent] = useState<String>();

  //const [, showCommentEdit] = useState<undefined | (() => void)>(undefined);

  //useEffect(()=>{
  //  useCallback(() => showCommentEdit(() => {}), []);
  //},[]);

  //const clickEditButton = (text?: string, comment_id?: number) => {
  //  if (isCommentEdit) {
  //    fetch(`${baseUrl}/comments/${comment_id}`, {
  //      method: "PATCH",
  //      headers: { "Content-Type": "application/json" },
  //      body: JSON.stringify({ content }),
  //    });
  //    setContent(content);
  //    setIsCommentEdit((isCommentEdit) => !isCommentEdit);
  //  }
  //};

  const clickLikeButton = (commentId?: Number, intraId?: String) => {
    fetch(`${baseUrl}/like.${commentId}/${intraId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    setIsLike((isLike) => !isLike);
  };

  return (
    <div>
      <div className={styles.commentUser}>
        {comment.intra_id}
        <span className={styles.commentUserBadge}>레벨{comment.user_level}</span>
        {showCommentEdit && (
          <span className={styles.commentEdditBtn}>수정하기</span>
        )}
      </div>
      <div>
        <Rating name="read-only" value={comment.star_rating} readOnly />|
        <span className={styles.commentTime}>{comment.update_time}</span>
      </div>
      {/*<div>
        {userState.intraId === comment.intraid ? (
          isCommentEdit ? (
            <div>
              <TextField
                id="outlined-multiline-static"
                label="후기"
                multiline
                defaultValue={comment.content}
                rows={4}
                placeholder="과제에 대한 후기를 남겨주세요."
                style={{ width: "100%", height: "120px" }}
                onChange={(e) => setContent(e.target.value)}
              />
              <button
                onClick={() => clickEditButton(comment.content, comment.id)}
              >
                수정완료
              </button>
            </div>
          ) : (
            <div>
              {comment.content}{" "}
              <button
                onClick={() => clickEditButton(comment.content, comment.id)}
              >
                수정
              </button>
            </div>
          )
        ) : (
          <div>{comment.content}</div>
        )}
      </div>*/}
      <div className={styles.detailContainer}>
        <div className={styles.detailValue}>
          <span className={styles.detailTitle}>소요시간</span>
          <span className={styles.detailContent}>
            {convertTimeTaken(comment.time_taken)}
          </span>
        </div>
        <div className={styles.detailValue}>
          <span className={styles.detailTitle}>난이도</span>
          <span className={styles.detailContent}>
            {convertAmountStudy(comment.amount_study)}
          </span>
        </div>
        <div className={styles.detailValue}>
          <span className={styles.detailTitle}>학습량</span>
          <span className={styles.detailContent}>
            {convertDifficulty(comment.difficulty)}
          </span>
        </div>
        <div className={styles.detailValue}>
          <span className={styles.detailTitle}>보너스</span>
          <span className={styles.detailContent}>
            {convertBonus(comment.bonus)}
          </span>
        </div>
      </div>
      <div className={styles.commentContent}>{comment.content}</div>
      <div>
        <button
          className={isLike ? styles.redButton : styles.emptyButton}
          onClick={() => clickLikeButton(comment.id, userState.intraId)}
        >
          <FavoriteIcon className={styles.heart} />
        </button>
        {comment.like_num}
      </div>
    </div>
  );
};
export default PrintComment;
