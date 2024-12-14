import axios from "axios";
import { parseCookies } from "nookies";

const useSendFriendRequest = () => {
  const cookies = parseCookies();
  const { accessToken } = cookies;
  const sendFriendRequest = async (userId) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/friends/${userId}/request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      await alert("已送出邀請！");
      window.location.reload();
      // return response;
    } catch (err) {
      alert(err.message || "送出邀請失敗");
    }
  };

  return { sendFriendRequest };
};

export default useSendFriendRequest;
