import axios from "axios";
import { parseCookies } from "nookies";

const useDeleteFriend = () => {
  const cookies = parseCookies();
  const { accessToken } = cookies;
  const deleteFriend = async (friendshipId, isNotFriendYet) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/friends/${friendshipId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      await alert(isNotFriendYet ? "已刪除好友邀請" : "已刪除好友");
      window.location.reload();
      // return response;
    } catch (err) {
      alert(err.message || isNotFriendYet ? "好友邀請刪除失敗" : "好友刪除失敗");
    }
  };

  return { deleteFriend };
};

export default useDeleteFriend;
