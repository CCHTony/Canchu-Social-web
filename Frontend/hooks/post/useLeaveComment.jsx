import axios from "axios";
import { parseCookies } from "nookies";
import { useState } from "react";

const useLeaveComment = ({ id }) => {
  const [error, setError] = useState(null);
  const cookies = parseCookies();
  const { accessToken } = cookies;
  const leaveComment = async (content) => {
    if (!content) alert("請輸入文字！");
    else {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/comment`,
          {
            content
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        await alert("留言成功！");
        window.location.reload();
      } catch (err) {
        setError(err.response?.data?.message || "留言失敗");
      }
    }
  };

  return { leaveComment, error };
};

export default useLeaveComment;
