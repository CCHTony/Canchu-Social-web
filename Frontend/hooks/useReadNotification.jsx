import axios from "axios";
import { parseCookies } from "nookies";

const useReadNotification = () => {
  // const [error, setError] = useState(null);
  const readNotification = async (eventId) => {
    const cookies = parseCookies();
    const { accessToken } = cookies;
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}/read
        `,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
    } catch (err) {
      console.log(err.response.data.message || "讀取動態失敗");
    }
  };

  return { readNotification };
};

export default useReadNotification;
