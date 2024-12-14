import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import useSendFriendRequest from "../../hooks/friends/useSendFriendRequest";
import useAgreeFriend from "../../hooks/friends/useAgreeFriend";
import Button from "../Layout/Button";
import useUpdateProfile from "../../hooks/user/useUpdateProfile";
import useDeleteFriend from "../../hooks/friends/useDeleteFriend";
import breakpoints from "../../shared/breakpoints";

function Sidebar({ user, isMyself }) {
  const [introduction, setIntroduction] = useState(user?.introduction);
  const [interesting, setInteresting] = useState(user?.tags);

  useEffect(() => {
    setIntroduction(user?.introduction);
    setInteresting(user?.tags);
  }, [user]);

  const [isEditing, setEditing] = useState(false);
  const { updateprofile } = useUpdateProfile();

  const { sendFriendRequest } = useSendFriendRequest();
  const { agreeFriend } = useAgreeFriend();
  const { deleteFriend } = useDeleteFriend();

  const clickCancel = () => {
    setEditing(false);
    setInteresting("");
    setIntroduction("");
  };
  return (
    <div className={`${SidebarCss} box`}>
      {isMyself ? (
        <Button isBlock bold onClick={() => setEditing(true)} grey={isEditing}>
          編輯個人檔案
        </Button>
      ) : user && (
        <>
          {!user.friendship && (
            <Button isBlock bold onClick={() => sendFriendRequest(user.id)}>
              邀請成為好友
            </Button>
          )}
          {user.friendship && (
            <>
              {user.friendship.status === "requested" && (
                <Button
                  isBlock
                  bold
                  grey
                  onClick={() => deleteFriend(user.friendship.id, true)}
                >
                  取消好友邀請
                </Button>
              )}
              {user.friendship.status === "pending" && (
                <Button isBlock bold onClick={() => agreeFriend(user.friendship.id)}>
                  答應好友邀請
                </Button>
              )}
              {user.friendship.status === "friend" && (
                <Button
                  isBlock
                  bold
                  grey
                  onClick={() => deleteFriend(user.friendship.id)}
                >
                  刪除好友
                </Button>
              )}
            </>
          )}
        </>
      )}

      <div className="info">
        <div className="intro">
          <h3>自我介紹</h3>
          {!isEditing &&
            (introduction ||
              (isMyself ? (
                <div className="defaultIntroText">
                  你還沒有新增自我介紹，快按編輯鈕來寫一些迷人的介紹給朋友吧！
                </div>
              ) : (
                <div className="defaultIntroText">他還沒新增自我介紹</div>
              )))}
          {isEditing && (
            <textarea
              placeholder={
                !user.introduction
                  ? "你還沒有新增自我介紹，快按編輯鈕來寫一些迷人的介紹給朋友吧！"
                  : "試著打一些自我介紹吧"
              }
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
            />
          )}
          {/* <b className="university">
                  <div className="icon">
                    <img src="/images/education.svg" alt="education" />
                  </div>
                  就讀的大學
                </b>
                <b className="city">
                  <div className="icon">
                    <img src="/images/location.svg" alt="location" />
                  </div>
                  我生活的城市
                </b> */}
        </div>
        {/* <div className="jobs">
                <h3>職業經歷</h3>
                <b>曾在 AppWorks School 擔任學員</b>
                <b>曾在 Poo Panda 擔任外送員</b>
              </div> */}
        <div className="interesting">
          <h3>興趣</h3>
          {!isEditing &&
            (interesting ||
              (isMyself ? (
                <div className="defaultIntroText">
                  你還沒有新增興趣喔，要不要考慮新增幾個來認識朋友呀？
                </div>
              ) : (
                <div className="defaultIntroText">他還沒有新增興趣</div>
              )))}
          {isEditing && (
            <textarea
              placeholder={
                !user.tags
                  ? "你還沒有新增興趣喔，要不要考慮新增幾個來認識朋友呀？"
                  : "可以寫下你的興趣哦"
              }
              value={interesting}
              onChange={(e) => setInteresting(e.target.value)}
            />
          )}
        </div>
        {isEditing && (
          <div className="functionList">
            <Button
              small
              onClick={() =>
                updateprofile({
                  name: user.name,
                  introduction,
                  tags: interesting
                })
              }
            >
              確認
            </Button>
            <Button small grey onClick={() => clickCancel()}>
              取消
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const SidebarCss = css`
  margin-right: 30px;
  padding: 25px 15px;
  width: 460px;
  min-width: 250px;

  .info {
    padding: 12px 10px;
    font-size: 16px;
    line-height: 24px;
    h3 {
      color: #525252;
      font-size: 18px;
      line-height: 24px;
      margin-bottom: 12px;
      margin-top: 10px;
      font-weight: bold;
    }
    b {
      display: block;
      margin-bottom: 8px;
    }
    .icon {
      width: 15px;
      height: 15px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 0 10px;
    }
    .intro {
      margin-bottom: 15px;
      color: var(--main-color);
    }
    .defaultIntroText {
      color: gray;
    }
    textarea {
      min-height: 70px;
    }
    .functionList {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
      button {
        margin-right: 15px; // temp
      }
    }
  }
  @media ${breakpoints.tablet} {
    width: 100%;
    margin-bottom: 23px;
  }
`;

export default Sidebar;
