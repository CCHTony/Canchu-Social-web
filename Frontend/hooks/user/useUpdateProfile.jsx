import { useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";

const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cookies = parseCookies();
  const { accessToken } = cookies;

  const updateprofile = async ({name, introduction, tags}) => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
        {
          name,
          introduction,
          tags
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      setIsLoading(false);
      await alert('檔案編輯成功');
      window.location.reload();
    //   return response.data;
    } catch (err) {
      setIsLoading(false);
      alert(err.message);
      setError(err.message || "檔案編輯失敗");
    }
  };

  return { updateprofile, isLoading, error };
};

export default useUpdateProfile;
