import axios from "axios";
import { useState, useEffect } from "react";
import { parseCookies } from "nookies";

const useFriends = () => {
  const [friends, setFriends] = useState(null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cookies = parseCookies();
      const { accessToken } = cookies;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/friends`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        setFriends(response.data.data.users);
      } catch (err) {
        console.log(err.response.data || "取得用戶資料失敗");
      }
    };

    fetchData();
  }, []);

  return { friends };
};

export default useFriends;
