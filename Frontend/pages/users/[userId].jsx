import { css } from "@emotion/css";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import PostAPost from "../../components/Post/UploadAPost";
import useUserProfile from "../../hooks/user/useUserProfile";
import useMyProfile from "../../hooks/user/useMyProfile";
import Posts from "../../components/Post/Posts";
import useUploadAvatar from "../../hooks/user/useUploadAvatar";
import Sidebar from "../../components/Profile/Sidebar";
import Avatar from "../../components/Layout/Avatar";
import breakpoints from "../../shared/breakpoints";

const UserPageCss = css`
  .profile {
    position: relative;
    background: white;
    padding: 0 8vw;
    padding-top: 145px;

    .info {
      display: flex;
      align-items: center;
      padding-bottom: 65px;
      .avatar {
        position: relative;
        width: 180px;
        height: 180px;
        margin-left: 20px;
        margin-right: 45px;
        overflow: hidden;
      }
      .myAvatar {
        cursor: pointer;
        .editBtn {
          display: none;
          background: rgba(0, 0, 0, 0.3);
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          input {
            background: red;
            width: 100%;
            height: 100%;
            position: absolute;
            opacity: 0;
            cursor: pointer;
          }
        }
        &:hover {
          .editBtn {
            position: absolute;
            display: flex;
            color: white;
          }
        }
      }
      .nameAndFriends {
        h1 {
          font-size: 40px;
          line-height: 54px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        i {
          font-size: 20px;
        }
      }
    }
    .tabs {
      border-top: 1px #c8c8c8 solid;
      .tab {
        display: inline-block;
        padding: 25px;
        cursor: pointer;
        color: var(--main-color);
        font-weight: bold;
      }
      .active {
        padding-bottom: 21px;
        border-bottom: 4px solid var(--main-color);
      }
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 35px 8vw;

    .posts {
      width: 100%;
    }
  }

  @media ${breakpoints.tablet} {
    .content {
      flex-direction: column;
    }
    .profile {
      .info {
        flex-direction: column;
        .avatar {
          margin-bottom: 20px;
          margin-right: 20px;
        }
      }
    }
  }
`;

function UserPage() {
  // profile
  const [userId, setUserId] = useState();
  const router = useRouter();
  useEffect(() => {
    if (router.query.userId) setUserId(router.query.userId);
  }, [router.query.userId]);
  const { user } = useUserProfile(userId);

  // authorize
  const { user: myProfile } = useMyProfile();
  const isMyself = () => myProfile && user && myProfile.id === user.id;

  // upload avatar
  const { uploadAvatar } = useUploadAvatar();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      uploadAvatar(e.target.files[0]);
    }
  };
  return (
    <Layout>
      <div className={UserPageCss}>
        <div className="profile">
          <div className="info">
            <div className={`avatar circleImg${isMyself() ? " myAvatar" : ""}`}>
              <Avatar picture={user?.picture} />
              {isMyself() && (
                <div className="editBtn">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                  編輯
                </div>
              )}
            </div>
            <div className="nameAndFriends">
              <h1>{user?.name}</h1>
              <i>{user?.friend_count} 位朋友</i>
            </div>
          </div>
          <div className="tabs">
            <div className="tab active">
              <h2>貼文</h2>
            </div>
          </div>
        </div>
        <div className="content">
          <Sidebar user={user} isMyself={isMyself()} />
          <div className="posts">
            {isMyself() && <PostAPost user={myProfile} />}
            {user && <Posts userId={user.id} isMyself={isMyself()} />}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserPage;
