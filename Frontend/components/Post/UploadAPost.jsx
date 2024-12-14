import { css } from "@emotion/css";
import { useState } from "react";
import Button from "../Layout/Button";
import useUploadAPost from "../../hooks/post/useUploadAPost";
import Avatar from "../Layout/Avatar";
import breakpoints from "../../shared/breakpoints";

const UploadAPostCss = css`
  margin: 0px 0px 23px 0px;
  padding: 20px;
  display: flex;

  .avatar {
    min-width: 75px;
    min-height: 75px;
    width: 75px;
    height: 75px;
    margin: 0 25px 0 5px;
  }

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    textarea {
      font-size: 18px;
      min-height: 100px;
    }
  }

  @media ${breakpoints.tablet} {
    flex-direction: column;
    .avatar {
      display: none;
    }
  }
`;

function UploadAPost({ user }) {
  const [postText, setPostText] = useState("");
  const { uploadAPost } = useUploadAPost();
  return (
    <div className={`${UploadAPostCss} box`}>
      <div className="avatar circleImg">
        <Avatar picture={user?.picture} />
      </div>
      <div className="form">
        <textarea
          placeholder="說點什麼嗎？"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <Button onClick={() => uploadAPost(postText)}>發佈貼文</Button>
      </div>
    </div>
  );
}

export default UploadAPost;
