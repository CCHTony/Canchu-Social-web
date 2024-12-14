import axios from "axios";
import { parseCookies } from "nookies";
import { useState } from "react";

const useUnlikeAPost = () => {
  const [error, setError] = useState(null);
  const cookies = parseCookies();
  const { accessToken } = cookies;
  const unlikeAPost = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/like`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
    } catch (err) {
      setError(err.response?.data?.message || "刪除愛心失敗");
    }
  };

  return { unlikeAPost, error };
};

export default useUnlikeAPost;
