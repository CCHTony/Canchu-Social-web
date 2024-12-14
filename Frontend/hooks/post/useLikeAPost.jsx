import axios from "axios";
import { parseCookies } from "nookies";
import { useState } from "react";

const useLikeAPost = () => {
  const [error, setError] = useState(null);
  const cookies = parseCookies();
  const { accessToken } = cookies;
  const likeAPost = async (id) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
    } catch (err) {
      setError(err.response?.data?.message || "點愛心失敗");
    }
  };

  return { likeAPost, error };
};

export default useLikeAPost;
