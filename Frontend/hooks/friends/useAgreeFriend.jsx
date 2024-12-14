import axios from "axios";
import { parseCookies } from "nookies";

const useAgreeFriend = () => {
  const cookies = parseCookies();
  const { accessToken } = cookies;
  const agreeFriend = async (friendshipId) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/friends/${friendshipId}/agree`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      await alert("已成為好友！");
      window.location.reload();
      // return response;
    } catch (err) {
      alert(err.message || "好友確認失敗");
    }
  };

  return { agreeFriend };
};

export default useAgreeFriend;
