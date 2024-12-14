import axios from "axios";
import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import useLogout from "../useLogOut";

const usePendingFriends = () => {
  const [friends, setFriends] = useState(null);
  // const [error, setError] = useState(null);
  const { logOut } = useLogout();

  const fetchData = async () => {
    const cookies = parseCookies();
    const { accessToken } = cookies;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/friends/pending`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setFriends(response.data.data.users);
    } catch (err) {
      console.log(err.response.data || "取得用戶資料失敗");
      if (err.response.status === 403) {
        logOut();
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { pendingFriends: friends };
};

export default usePendingFriends;
