import { css } from "@emotion/css";
import Link from "next/link";
import { useState } from "react";
import useFriends from "../../hooks/friends/useFriends";
import usePendingFriends from "../../hooks/friends/usePendingFriends";
import Button from "../Layout/Button";
import useAgreeFriend from "../../hooks/friends/useAgreeFriend";
import useDeleteFriend from "../../hooks/friends/useDeleteFriend";
import breakpoints from "../../shared/breakpoints";
import Avatar from "../Layout/Avatar";

function Sidebar({ user }) {
  const [showAllFriends, setShowAllFriend] = useState(false);
  const { pendingFriends } = usePendingFriends();
  const { friends } = useFriends();
  const { agreeFriend } = useAgreeFriend();
  const { deleteFriend } = useDeleteFriend();
  return (
    <div className={`${SidebarCss} box`}>
      <div className="function">
        <Link href={`/users/${user?.id}`}>
          <div className="circleImg">
            <Avatar picture={user?.picture} />
          </div>
          {user?.name}
        </Link>
      </div>
      {/* <div className="function">
        <div className="circleImg"></div>
        好友邀請
      </div> */}
      <div className="segmentLine" />
      <div className="function functionTitle">
        <div className="circleImg icon">
          <img src="/images/user.svg" alt="user icon" />
        </div>
        我的好友
      </div>
      {pendingFriends?.map((pendingFriend) => (
        <div className="function" key="friend.id">
          <Link href={`/users/${pendingFriend.id}`}>
            <div className="circleImg">
            <Avatar picture={pendingFriend?.picture} />
            </div>
            <div />

            {pendingFriend.name}
          </Link>
          <div className="accessBtn">
            <Button
              small
              onClick={() => agreeFriend(pendingFriend.friendship.id)}
            >
              確認
            </Button>
            <Button
              small
              grey
              onClick={() =>
                deleteFriend(pendingFriend.friendship.id, "not friend yet")
              }
            >
              取消
            </Button>
          </div>
        </div>
      ))}
      {friends?.map(
        (friend, index) =>
          (index < 6 || showAllFriends) && (
            <div className="function" key="friend.id">
              <Link href={`/users/${friend.id}`}>
                <div className="circleImg">
                  <Avatar picture={friend?.picture} />
                </div>
                {friend.name}
              </Link>
            </div>
          )
      )}
      {(!friends || friends?.length === 0) &&
      (!pendingFriends || pendingFriends?.length === 0) ? (
        <div className="friendNullMessage">你沒有朋友</div>
      ) : null}
      {!showAllFriends && friends?.length >= 6 && (
        <div className="function" onClick={() => setShowAllFriend(true)}>
          <div className="circleImg icon">
            <img src="/images/hamburger.svg" alt="hamburger" />
          </div>
          查看全部
        </div>
      )}
      <div className="info">
        關於我們 · 隱私權條款 · Cookie 條款 · © 2023 CanChu, Inc.
      </div>
    </div>
  );
}

const SidebarCss = css`
  position: relative;
  width: 25%;
  min-width: 260px;
  padding: 20px 25px;
  margin-right: 30px;

  .function {
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 18px;
    font-weight: bold;
    margin: 8px 0;
    cursor: pointer;
    a {
      display: flex;
      align-items: center;
      color: black;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
    .accessBtn {
      position: absolute;
      right: 25px;
      button {
        margin-left: 6px;
      }
    }
    .circleImg {
      width: 40px;
      height: 40px;
      margin-right: 15px;
    }
    .icon {
      background: transparent;
      img {
        object-fit: none;
      }
    }
  }
  .functionTitle {
    color: #767676;
    cursor: auto;
  }
  .info {
    position: absolute;
    transform: translateY(40px);
    width: 100%;
    left: 0;
    padding: 0 25px; // same to sidebar
    line-height: 24px;
  }
  .friendNullMessage {
    /* text-align: center; */
    margin: 10px 0;
    padding-left: 55px;
  }

  @media ${breakpoints.tablet} {
    display: none;
  }
`;

export default Sidebar;
