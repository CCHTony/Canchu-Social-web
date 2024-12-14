import { css } from "@emotion/css";
import Link from "next/link";
import { useState } from "react";
import useLogout from "../../hooks/useLogOut";
import useNotifications from "../../hooks/useNotifications";
import useSearchUsers from "../../hooks/user/useSearchUsers";
import useMyProfile from "../../hooks/user/useMyProfile";
import breakpoints from "../../shared/breakpoints";
import Avatar from "./Avatar";
import EachNotification from "./EachNotification";

function Nav() {
  const { logOut } = useLogout();
  const { user } = useMyProfile();
  const { events } = useNotifications();
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchUsers = useSearchUsers(searchKeyword);
  const [isSearchFocused, setSearchIsFocused] = useState(false);
  return (
    <div className={NavCss}>
      <Link href="/">
        <img className="logo" src="/images/logo.svg" alt="logo" />
      </Link>
      <div className="search">
        <div className="searchInputContainer">
          <img className="searchImg" src="/images/search.png" alt="search" />
          <input
            placeholder="搜尋"
            onInput={(e) => setSearchKeyword(e.target.value)}
            onFocus={() => setSearchIsFocused(true)}
            onBlur={() =>
              setTimeout(() => {
                setSearchIsFocused(false);
              }, 50)
            }
          />
        </div>
        {/* {console.log(isSearchFocused)} */}
        {/* {console.log(searchUsers)} */}
        {isSearchFocused && searchUsers.length !== 0 && (
          <div className="searchList box">
            {searchUsers?.map((searchUser) => (
              <Link href={`/user/${searchUser.id}`} key={searchUser.id} className="user">
                <div className="circleImg">
                  {searchUser.picture && (
                    <img src={searchUser.picture} alt="user avatar" />
                  )}
                </div>
                {searchUser.name}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="functions">
        <div className="notificationBtn hoverBtn">
          <div className="circleImg">
            <img src="/images/notification.svg" alt="notification" />
          </div>
          <div className="hoverContainer">
            <div className="hoverArea">
              <div className="notificationContent box">
                <div className="notificationTitle">
                  <div className="circleImg">
                    <img
                      src="/images/notification_colored.svg"
                      alt="notification"
                    />
                  </div>
                  我的通知
                </div>
                <div className="notifications">
                  {events?.map((event) => (
                    <EachNotification event={event} key={event.id} />
                  ))}
                  {/* {events?.length >= 1 && (
                  <div className="showMoreNotification">
                    <b>查看全部通知</b>
                  </div>
                )} */}
                  {events && events.length === 0 && <div className="nullMessage">沒有任何通知</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="avatarBtn hoverBtn">
          <div className="circleImg">
            <Avatar picture={user?.picture} />
          </div>
          <div className="hoverContainer">
            <div className="hoverArea">
              <div className="box">
                <Link href={`/users/${user?.id}`} className="btn">
                  查看個人檔案
                </Link>
                <div className="btn" onClick={() => logOut()}>
                  登出
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const NavCss = css`
  position: fixed;
  width: 100vw;
  height: 100px;
  background: white;
  border-bottom: 1px solid #d9d9d9;
  padding: 25px 150px;
  display: flex;
  align-items: center;
  z-index: 99;

  .logo {
    width: 113px;
  }
  .search {
    position: relative;
    margin-left: 23px;

    .searchInputContainer {
      display: flex;
      align-items: center;
      .searchImg {
        position: absolute;
        width: 17px;
        left: 13px;
      }
      input {
        color: #566470;
        background: #f0f2f5;
        border: 1px solid #d9d9d9;
        border: 0;
        padding: 12px 20px 12px 35px;
        border-radius: 10px;
        min-width: 270px;
        font-size: 16px;
      }
    }
    .searchList {
      position: absolute;
      width: 100%;
      border-radius: 20px;
      overflow: hidden;
      .user {
        display: flex;
        align-items: center;
        padding: 18px 20px;
        border-bottom: 1px solid #d9d9d9;
        cursor: pointer;
        color: black;
        text-decoration: none;
        &:hover {
          background: #eeeeee;
          .circleImg {
            background: white;
          }
        }
        .circleImg {
          width: 25px;
          height: 25px;
          margin-right: 8px;
        }
      }
      .user:last-child {
        border: 0;
      }
    }
  }

  .hoverBtn {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    .hoverArea {
      /* background: red; */
      padding-top: 44px;
      cursor: auto;
    }
    .hoverContainer {
      display: none;
      position: absolute;
      margin-top: 36px;
    }
    &:hover {
      .hoverContainer {
        display: block;
      }
    }
  }

  .functions {
    position: absolute;
    right: 140px;
    display: flex;
    .notificationBtn,
    .avatarBtn {
      width: 36px;
      height: 36px;
      cursor: pointer;
      margin-right: 16px;
      .circleImg {
        height: 100%;
        width: 100%;
      }
    }
    .notificationBtn {
      .circleImg {
        width: 36px;
        height: 36px;
        background: var(--main-color);
        img {
          width: 60%;
          height: 60%;
        }
      }

      .notificationContent {
        width: 330px;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .notificationTitle {
          background: var(--main-color);
          font-weight: bold;
          color: white;
          display: flex;
          align-items: center;
          padding: 15px 25px;
          cursor: auto;

          .circleImg {
            margin-right: 10px;
            background: white;
          }
        }
        .notifications {
          max-height: 350px;
          overflow-x: scroll;
          .nullMessage {
            padding: 20px;
            text-align: center;
          }
        }
        .notification:last-child {
          border: 0;
        }
        .showMoreNotification {
          padding: 10px 0;
          text-align: center;
          /* text-decoration: underline; */
          b {
            display: inline-block;
            position: relative;
            &::after {
              content: "";
              position: absolute;
              left: 0;
              bottom: -1px; /* 調整此值以控制下劃線與文字之間的距離 */
              width: 100%;
              height: 1px;
              background-color: currentColor;
            }
          }
        }
      }
    }
    .avatarBtn {
      .box {
        width: 150px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .btn {
        cursor: pointer;
        padding: 15px 25px;
        /* margin: 0; */
        border-bottom: 1px solid #d1cace;
        line-height: 24px;
        color: black;
        text-decoration: none;

        &:hover {
          background: #eee;
          /* border-color: #eee; */
        }
      }
      .btn:last-child {
        border: 0;
      }
    }
  }

  @media ${breakpoints.tablet} {
    padding: 25px 50px;

    .functions {
      right: 50px;
    }

    .search {
      .searchInputContainer {
        input {
          min-width: 220px;
        }
      }
    }
  }
  @media ${breakpoints.phone} {
    .search {
      display: none;
    }
    .functions {
      right: 15px;
    }
    .hoverBtn {
      .hoverContainer {
        position: fixed;
        margin-top: 23px;
        right: -1px;
      }
    }
  }
`;

export default Nav;
