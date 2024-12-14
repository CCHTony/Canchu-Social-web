import { parseCookies } from "nookies";
import useUserProfile from "./useUserProfile";

const useMyProfile = () => {
  const cookies = parseCookies();
  const { userId } = cookies;
  const { user } = useUserProfile(userId);

  return { user };
};

export default useMyProfile;
