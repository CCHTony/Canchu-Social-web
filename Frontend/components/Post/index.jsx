import { css } from "@emotion/css";
import Link from "next/link";
import React, { useState } from "react";
import Comments from "./Comments";
import LeaveComment from "./LeaveComment";
import useLikeAPost from "../../hooks/post/useLikeAPost";
import useUnlikeAPost from "../../hooks/post/useUnlikeAPost";
import useMyProfile from "../../hooks/user/useMyProfile";
import Button from "../Layout/Button";
import useEditAPost from "../../hooks/post/useEditAPost";
import Avatar from "../Layout/Avatar";
import breakpoints from "../../shared/breakpoints";

function Post({
  id,
  userId,
  picture,
  name,
  createdAt,
  context,
  isLiked: APILike,
  likeCount: APILikeCount,
  commentCount,
  comments,
  showComments
}) {
  const { user: myself } = useMyProfile();
  const isMyself = () => myself?.id === userId;
  // console.log("render")

  const [feedText, setFeedText] = useState(context);
  const [isEditing, setEditing] = useState(false);
  const { editAPost } = useEditAPost();
  const handleEdit = (e) => {
    e.preventDefault();
    editAPost(id, feedText);
  };

  const [isLiked, setLiked] = useState(APILike); // Optimistic UI Update
  const [likeCount, setLikeCount] = useState(APILikeCount);
  const { likeAPost } = useLikeAPost();
  const { unlikeAPost } = useUnlikeAPost();
  const handleLike = () => {
    if (!isLiked) {
      likeAPost(id);
      setLikeCount((prev) => prev + 1);
    }
    else {
      unlikeAPost(id);
      setLikeCount((prev) => prev - 1);
    }
    setLiked(!isLiked);
  };

  const userLink = `/users/${userId}`;
  const postLink = `/posts/${id}`;
  return (
    <div className={`${FeedCss} box`}>
      {isMyself() && !isEditing && (
        <div className="editBtn" onClick={() => setEditing(true)}>
          <img src="/images/edit_btn.svg" alt="edit" />
        </div>
      )}
      <div className="contentArea">
        <div className="user">
          <Link href={userLink} className="avatar circleImg">
            <Avatar picture={picture} />
          </Link>
          <div className="userData">
            <Link href={userLink} className="userName">
              <h2>{name}</h2>
            </Link>
            <Link href={postLink} className="timeStamp">
              {createdAt}
            </Link>
          </div>
        </div>
        {!isEditing ? (
          <article className="feedText">{context}</article>
        ) : (
          <form onSubmit={(e) => handleEdit(e)}>
            <textarea
              className="feedText"
              value={feedText}
              onChange={(e) => setFeedText(e.target.value)}
            />
            <div className="btns">
              <Button small type="submit">
                確認
              </Button>
              <Button small grey onClick={() => setEditing(false)}>
                取消
              </Button>
            </div>
          </form>
        )}
        <div className="functionList">
          <div
            className={`likeBtn${isLiked ? " isLiked" : ""}`}
            onClick={handleLike}
          >
            <img
              src={`/images/heart${isLiked ? "_liked" : ""}.svg`}
              alt="liked"
            />
          </div>
          <Link href={postLink} className="commentBtn">
            <img src="/images/comment.svg" alt="comment button" />
          </Link>
          <div className="shareBtn" />
        </div>
        <div className="interactionStatus">
          <div className="whoLikes">
            {/* <div className="friendPhotos">
              <div className="friendPhoto" />
              <div className="friendPhoto" />
              <div className="friendPhoto" />
            </div> */}
            <Link href={postLink} className="namesOfLikes">
              {likeCount} 人喜歡這則貼文
            </Link>
          </div>
          <div className="interactionInfo">
            <Link href={postLink} className="numberOfComments">
              {commentCount} 則留言
            </Link>
            {/* <div className="numberOfSharings">5 次分享</div> */}
          </div>
        </div>
      </div>
      <div className="commentArea">
        {showComments && <Comments comments={comments} />}
        <div className="leaveComment">
          <Link href={userLink} className="myAvatar circleImg">
            <Avatar picture={myself?.picture} />
          </Link>
          {!showComments ? (
            <Link href={postLink} className="commentBtn">
              留個言吧
            </Link>
          ) : (
            <LeaveComment id={id} />
          )}
        </div>
      </div>
    </div>
  );
}

const FeedCss = css`
  position: relative;
  /* min-width: 500px; */
  margin: 0px 0px 23px 0px;
  font-size: 13px;

  .editBtn {
    position: absolute;
    width: 24px;
    right: 20px;
    top: 20px;
    cursor: pointer;
    display: none;
    img {
      width: 100%;
    }
  }

  &:hover {
    .editBtn {
      display: block;
    }
  }

  .contentArea {
    padding: 0 40px;
  }

  .user {
    display: flex;
    margin: 20px 0px;

    .avatar {
      border-radius: 50%;
      border: 1px solid #d9d9d9;
      width: 75px;
      height: 75px;
      margin-right: 15px;
      cursor: pointer;
    }

    .userData {
      display: flex;
      flex-direction: column;
      justify-content: center;

      a {
        color: black;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }

      .userName {
        font-weight: bold;
        font-size: 18px;
        cursor: pointer;
        margin-bottom: 5px;

        &:hover {
          text-decoration: underline;
        }
      }

      .timeStamp {
        color: #909090;
        cursor: pointer;
        font-size: 14px;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .feedText {
    font-size: 16px;
    margin: 5px 0px 20px 0px;
    min-height: 100px;
    white-space: pre-line;
    line-height: 24px;
  }
  textarea.feedText {
    width: calc(100% - 80px);
    margin-bottom: 15px;
  }

  .btns {
    margin-bottom: 20px;
    margin-right: 40px;
    display: flex;
    justify-content: flex-end;

    button {
      margin-left: 10px; // temp
    }
  }

  .functionList {
    position: relative;
    display: flex;
    margin: 0px 0px;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    padding: 8px 5px;

    .likeBtn,
    .commentBtn,
    .shareBtn {
      width: 20px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      /* border: 1px solid #d9d9d9; */

      img {
        width: 100%;
      }
    }
    .likeBtn {
      /* background-color: #f85c53; */
      /* border-color: #f85c53; */
      margin-right: 10px;
    }

    .isLiked {
      img {
        width: 125%;
        transition: 0.5s;
        /* filter: invert(45%) sepia(53%) saturate(761%) hue-rotate(314deg) */
        /* brightness(98%) contrast(99%); */
      }
    }
  }

  .shareBtn {
    position: absolute;
    right: 5px;
  }

  .interactionStatus {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0px;
  }

  .whoLikes {
    display: flex;
    align-items: center;
    cursor: pointer;
    .namesOfLikes {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .friendPhotos {
    display: flex;
    margin-right: 7px;
    .friendPhoto {
      border: 1px solid white;
      background: #d9d9d9;
      border-radius: 50%;
      width: 19px;
      height: 19px;
      margin-left: -7px;
      &:first-child {
        margin-left: 0;
      }
    }
  }

  .namesOfLikes,
  .numberOfComments,
  .numberOfSharings {
    font-size: 16px;
    color: #5c5c5c;
    cursor: pointer;
    text-decoration: none;
  }

  .interactionInfo {
    display: flex;
    position: absolute;
    right: 0;
  }

  .numberOfComments:hover,
  .numberOfSharings:hover {
    text-decoration: underline;
  }

  .numberOfComments {
    margin-right: 15px;
  }

  .commentArea {
    border-top: 1px solid #d9d9d9;
    padding: 20px 40px;
    .leaveComment {
      display: flex;
      align-items: center;
      .commentBtn {
        padding: 15px 0;
        border-radius: 50px;
        background: #f0f0f0;
        color: #777;
        font-size: 20px;
        text-align: center;
        width: 100%;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
      }
    }
  }

  .myAvatar {
    display: block;
    min-width: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #a4c3d3;
    margin-right: 20px;
  }

  @media ${breakpoints.phone} {
    .contentArea {
      padding: 0 30px;
    }
    .commentArea {
      padding: 20px 30px;
    }
  }
`;

export default React.memo(Post);
