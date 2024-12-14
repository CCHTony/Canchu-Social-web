import axios from "axios";
import { parseCookies } from "nookies";
import { useState } from "react";

const useUploadAPost = () => {
  const [error, setError] = useState(null);
  const cookies = parseCookies();
  const { accessToken } = cookies;
  const uploadAPost = async (context) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts`,
        {
          context
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      await alert("發文成功！");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "發文失敗");
    }
  };

  return { uploadAPost, error };
};

export default useUploadAPost;
