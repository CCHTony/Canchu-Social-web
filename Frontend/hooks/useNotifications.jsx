import axios from "axios";
import { useState, useEffect } from "react";
import { parseCookies } from "nookies";

const useNotifications = () => {
  const [events, setEvents] = useState(null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cookies = parseCookies();
      const { accessToken } = cookies;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/events`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        setEvents(response.data.data.events);
      } catch (err) {
        console.log(err.response.data.message || "取得用戶資料失敗")
      }
    };

    fetchData();
  }, []);

  return { events };
};

export default useNotifications;
