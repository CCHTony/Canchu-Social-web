import { css } from "@emotion/css";
import { useState } from "react";
import useLeaveComment from "../../hooks/post/useLeaveComment";

const LeaveCommentCss = css`
  width: 100%;
  display: flex;
  align-items: center;
  .commentInput {
    border-radius: 50px;
    background: #f0f0f0;
    color: #777;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    text-align: left;
    padding: 16px 30px;
    font-size: 16px;
    color: black;
    width: 100%;
    &:focus-visible {
      outline: 0;
    }
  }
  .commentSendBtn {
    position: absolute;
    right: 65px;
    width: 35px;
    cursor: pointer;
    opacity: 0.5;
    background: transparent;
    border: 0;
    img {
      width: 100%;
    }
  }
`;

function LeaveComment(id) {
  const { leaveComment } = useLeaveComment(id);
  const [comment, setComment] = useState("");
  const handleLeaveComment = (e) => {
    e.preventDefault();
    leaveComment(comment);
  }
  return (
    <form className={LeaveCommentCss} onSubmit={(e) => handleLeaveComment(e)}>
      <input
        className="commentInput"
        placeholder="留個言吧"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="commentSendBtn" type="submit">
        <img src="/images/paper_plane.png" alt="send paper-plane" />
      </button>
    </form>
  );
}

export default LeaveComment;
