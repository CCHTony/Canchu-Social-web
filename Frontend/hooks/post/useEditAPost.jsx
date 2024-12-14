import axios from "axios";
import { parseCookies } from "nookies";
import { useState } from "react";

const useEditAPost = () => {
  const [error, setError] = useState(null);
  const cookies = parseCookies();
  const { accessToken } = cookies;
  const editAPost = async (id, context) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
        {
          context
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      await alert("修改成功！");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "動態修改失敗");
    }
  };

  return { editAPost, error };
};

export default useEditAPost;
