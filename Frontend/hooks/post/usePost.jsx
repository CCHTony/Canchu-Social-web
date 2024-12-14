import axios from "axios";
import { useState, useEffect } from "react";
import { parseCookies } from "nookies";

const usePost = (postId) => {
  const [post, setPost] = useState(null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cookies = parseCookies();
      const { accessToken } = cookies;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        setPost(response.data.data.post);
      } catch (err) {
        console.log(err.response.data.message || "取得用戶資料失敗");
      }
    };

    if (postId) fetchData();
  }, [postId]);

  return { post };
};

export default usePost;
