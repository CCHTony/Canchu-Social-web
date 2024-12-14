import { css } from "@emotion/css";
import Link from "next/link";
import Avatar from "../Layout/Avatar";

const CommentsCss = css`
  display: flex;
  margin-bottom: 25px;
  .circleImg {
    min-width: 32px;
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
  .content {
    background: rgba(217, 217, 217, 0.32);
    border-radius: 20px;
    padding: 14px 18px 20px 18px;
    font-size: 16px;
    line-height: 24px;
    b {
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
  .info {
    margin-top: 8px;
    /* margin-left: 2px; */
  }
`;

function Comments({ comments }) {
  const userLink = (comment) => comment.user.id;
  return comments?.map((comment) => (
    <div className={CommentsCss}>
      <Link href={`/user/${userLink(comment)}`} className="circleImg">
        <Avatar picture={comment.user.picture}/>
      </Link>
      <div>
        <div className="content">
          <b>{comment.user.name}</b>
          <p>{comment.content}</p>
        </div>
        <div className="info">
          {/* <div>{comment.like_count} 個人喜歡</div> */}
          <div>{comment.created_at}</div>
        </div>
      </div>
    </div>
  ));
}

export default Comments;
