import axios from "axios";
import { useState, useEffect } from "react";
import { parseCookies } from "nookies";

const usePosts = (userId) => {
  const [posts, setPosts] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [isNoMorePosts, setIsNoMorePosts] = useState(false);
  // const [error, setError] = useState(null);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/search?`;
  const cookies = parseCookies();
  const { accessToken } = cookies;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${url}${userId ? `user_id=${userId}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setPosts(response.data.data.posts);
      setCursor(response.data.data.next_cursor);
    } catch (err) {
      // setError(err.response.data.message || "取得用戶資料失敗");
      console.log(err || "取得首批貼文失敗");
    }
  };
  useEffect(() => {
    fetchData();
  }, [userId]);

  return {
    posts,
    updatePostsByCursor: async () => {
      // console.log(`fetch by cursor: ${cursor}`)
      if (cursor) {
        try {
          const response = await axios.get(
            `${url}cursor=${cursor}${userId ? `&user_id=${userId}` : ""}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          );
          // console.log('sucess fetch!')
          setPosts([...posts, ...response.data.data.posts]);
          setCursor(response.data.data.next_cursor);
        } catch (err) {
          console.log(err.response.data || "取得用戶資料失敗");
        }
      } else {
        setIsNoMorePosts(true);
      }
    },
    isNoMorePosts
  };
};

export default usePosts;
